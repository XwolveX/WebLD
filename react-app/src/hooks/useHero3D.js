import { useEffect } from 'react';
import * as THREE from 'three';

/* Rotating bronze torus-knot ornament in the hero, desktop only. Falls
   back gracefully (CSS facets stay visible) if WebGL is unavailable. */
export function useHero3D(containerRef, facetsSelector = '[data-facet]') {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    if (!window.matchMedia('(min-width:981px)').matches) return undefined;

    let renderer;
    let rafId;
    let onResize;
    let onMouseMove;

    try {
      const width = container.clientWidth, height = container.clientHeight;
      if (width < 10 || height < 10) return undefined;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0, 7);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      container.querySelectorAll(facetsSelector).forEach((f) => { f.style.display = 'none'; });
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.1, 0.3, 160, 20, 2, 3),
        new THREE.MeshStandardMaterial({ color: 0xA8834A, metalness: 0.85, roughness: 0.32 })
      );
      group.add(knot);
      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.05, 0),
        new THREE.MeshBasicMaterial({ color: 0xDEBB7C, wireframe: true, transparent: true, opacity: 0.22 })
      );
      group.add(ico);
      scene.add(group);

      scene.add(new THREE.AmbientLight(0x6e5228, 1.1));
      const key = new THREE.PointLight(0xDEBB7C, 1.4, 20); key.position.set(4, 3, 5); scene.add(key);
      const fill = new THREE.PointLight(0x2F5449, 1.0, 20); fill.position.set(-4, -2, 3); scene.add(fill);

      let tmx = 0, tmy = 0;
      onMouseMove = (e) => {
        const r = container.getBoundingClientRect();
        tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      container.addEventListener('mousemove', onMouseMove);

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        group.rotation.y += 0.0035;
        group.rotation.x += 0.0011;
        camera.position.x += (tmx * 1.1 - camera.position.x) * 0.04;
        camera.position.y += (-tmy * 1.1 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      animate();

      onResize = () => {
        if (!window.matchMedia('(min-width:981px)').matches) return;
        const w = container.clientWidth, h = container.clientHeight;
        if (w < 10 || h < 10) return;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);
    } catch (err) {
      /* WebGL unavailable — CSS facets remain visible as fallback */
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (onResize) window.removeEventListener('resize', onResize);
      if (onMouseMove) container.removeEventListener('mousemove', onMouseMove);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [containerRef, facetsSelector]);
}
