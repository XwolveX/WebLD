/* L&D Ceramics — dữ liệu dự án, dùng bởi trang /du-an/:id (và /en/projects/:id).
   Mỗi khoá là một URL. Thêm dự án mới = thêm một khoá ở đây; trang, sitemap
   và meta SEO được sinh tự động khi build. Nhớ thêm thẻ tương ứng ở Spaces.jsx. */
export const PROJECT_DATA = {
  meridian: {
    num: '01',
    title: { vi: 'BST Meridian', en: 'Meridian Collection' },
    category: { vi: 'Phòng khách', en: 'Living Room' },
    texture: 'sceneMeridian',
    intro: { vi: 'Gỗ óc chó nguyên khối, đường nét tối giản, dành cho không gian tiếp khách trầm và sâu.', en: 'Solid walnut wood with minimal lines, made for a living room that feels calm and grounded.' },
    paragraphs: [
      { vi: 'Meridian ra đời từ một câu hỏi đơn giản: một phòng khách cần bao nhiêu chi tiết để đủ đầy? Câu trả lời của chúng tôi là rất ít — miễn là từng chi tiết còn lại đều được chọn lọc kỹ càng.', en: 'Meridian began with a simple question: how many details does a living room actually need? Our answer is very few — as long as every remaining detail is chosen with care.' },
      { vi: 'Toàn bộ hệ bàn ghế sử dụng gỗ óc chó nguyên khối, để lộ vân gỗ tự nhiên thay vì phủ sơn che lấp. Ánh sáng buổi chiều đi qua cửa kính lớn sẽ đổi màu bề mặt gỗ theo từng giờ trong ngày.', en: 'The entire table and seating system is solid walnut, left unpainted to reveal its natural grain. Afternoon light through large glass doors shifts the wood\'s tone hour by hour.' },
      { vi: 'Bộ sưu tập phù hợp với những không gian có trần cao trên 3m, ưu tiên ánh sáng tự nhiên từ một hướng chính.', en: 'Best suited to spaces with ceilings above 3m and natural light from one primary direction.' },
    ],
    specs: [
      { k: { vi: 'Diện tích đề xuất', en: 'Suggested area' }, v: { vi: '32 – 55 m²', en: '32 – 55 m²' } },
      { k: { vi: 'Chất liệu chính', en: 'Primary materials' }, v: { vi: 'Gỗ óc chó, vải lanh', en: 'Walnut wood, linen' } },
      { k: { vi: 'Thời gian chế tác', en: 'Crafting time' }, v: { vi: '6 – 8 tuần', en: '6 – 8 weeks' } },
      { k: { vi: 'Bảo hành', en: 'Warranty' }, v: { vi: '5 năm khung gỗ', en: '5-year wood frame warranty' } },
    ],
    swatches: ['texWalnut', 'texLinen', 'texBronze'],
  },
  solstice: {
    num: '02',
    title: { vi: 'BST Solstice', en: 'Solstice Collection' },
    category: { vi: 'Phòng ngủ', en: 'Bedroom' },
    texture: 'sceneSolstice',
    intro: { vi: 'Đá cẩm thạch xanh rêu kết hợp vải lanh tự nhiên, tạo nhịp thở chậm cho không gian nghỉ ngơi.', en: 'Moss-green marble paired with natural linen, slowing the rhythm of a restful bedroom.' },
    paragraphs: [
      { vi: 'Solstice được thiết kế cho khoảnh khắc cuối ngày — khi ánh sáng dịu lại và không gian cần chậm theo. Đá cẩm thạch xanh rêu làm mặt bàn đầu giường, đối lập tinh tế với ga trải giường vải lanh thô mộc.', en: 'Solstice is designed for the last moments of the day, when light softens and the room should slow down with it. Moss-green marble tops the nightstand, set against raw linen bedding.' },
      { vi: 'Chúng tôi hạn chế tối đa các bề mặt phản chiếu mạnh trong bộ sưu tập này, ưu tiên chất liệu hấp thụ ánh sáng để giữ cảm giác tĩnh tại cho phòng ngủ.', en: 'We kept reflective surfaces to a minimum in this collection, favouring light-absorbing materials to keep the bedroom feeling still.' },
    ],
    specs: [
      { k: { vi: 'Diện tích đề xuất', en: 'Suggested area' }, v: { vi: '18 – 30 m²', en: '18 – 30 m²' } },
      { k: { vi: 'Chất liệu chính', en: 'Primary materials' }, v: { vi: 'Đá cẩm thạch, vải lanh', en: 'Marble, linen' } },
      { k: { vi: 'Thời gian chế tác', en: 'Crafting time' }, v: { vi: '5 – 7 tuần', en: '5 – 7 weeks' } },
      { k: { vi: 'Bảo hành', en: 'Warranty' }, v: { vi: '3 năm bề mặt đá', en: '3-year stone surface warranty' } },
    ],
    swatches: ['texMarble', 'texLinen', 'texWalnut'],
  },
  atelier: {
    num: '03',
    title: { vi: 'BST Atelier', en: 'Atelier Collection' },
    category: { vi: 'Không gian làm việc', en: 'Workspace' },
    texture: 'sceneAtelier',
    intro: { vi: 'Đồng chải xước và da thuộc Ý — chất liệu của những quyết định quan trọng.', en: 'Brushed bronze and Italian leather — materials for the decisions that matter.' },
    paragraphs: [
      { vi: 'Atelier hướng đến người dành nhiều giờ mỗi ngày sau bàn làm việc. Khung đồng chải xước chịu lực tốt, mặt bàn bọc da thuộc Ý pieno fiore mềm dần theo thời gian sử dụng thay vì xuống cấp.', en: 'Atelier is built for people who spend long hours at a desk. The brushed bronze frame carries real load, while the pieno fiore leather top softens with use instead of wearing down.' },
      { vi: 'Bộ sưu tập đi kèm hệ tủ lưu trữ module, cho phép mở rộng theo nhu cầu công việc mà không phá vỡ tổng thể thiết kế ban đầu.', en: 'The collection includes a modular storage system that can expand with your workload without breaking the original design.' },
    ],
    specs: [
      { k: { vi: 'Diện tích đề xuất', en: 'Suggested area' }, v: { vi: '12 – 24 m²', en: '12 – 24 m²' } },
      { k: { vi: 'Chất liệu chính', en: 'Primary materials' }, v: { vi: 'Đồng chải xước, da Ý', en: 'Brushed bronze, Italian leather' } },
      { k: { vi: 'Thời gian chế tác', en: 'Crafting time' }, v: { vi: '6 – 9 tuần', en: '6 – 9 weeks' } },
      { k: { vi: 'Bảo hành', en: 'Warranty' }, v: { vi: '5 năm khung đồng', en: '5-year bronze frame warranty' } },
    ],
    swatches: ['texBronze', 'texLeather', 'texWalnut'],
  },
  riviera: {
    num: '04',
    title: { vi: 'BST Riviera', en: 'Riviera Collection' },
    category: { vi: 'Phòng ăn', en: 'Dining Room' },
    texture: 'sceneRiviera',
    intro: { vi: 'Bàn ăn đá cẩm thạch trên chân đồng đúc, dành cho những bữa tối kéo dài.', en: 'A marble dining table on cast bronze legs, made for evenings that run long.' },
    paragraphs: [
      { vi: 'Riviera lấy cảm hứng từ những bữa ăn không vội vã. Mặt bàn đá cẩm thạch nguyên tấm đặt trên hệ chân đồng đúc thủ công, đủ chắc chắn để trở thành trung tâm của mọi buổi tụ họp gia đình.', en: 'Riviera is inspired by unhurried meals. A single marble slab rests on hand-cast bronze legs, sturdy enough to anchor every family gathering.' },
      { vi: 'Ghế ăn đi kèm sử dụng khung gỗ óc chó bọc vải lanh, có thể đặt riêng theo số lượng khách thường xuyên của gia chủ.', en: 'The matching chairs use walnut frames upholstered in linen, and can be custom-ordered to match your usual number of guests.' },
    ],
    specs: [
      { k: { vi: 'Diện tích đề xuất', en: 'Suggested area' }, v: { vi: '20 – 40 m²', en: '20 – 40 m²' } },
      { k: { vi: 'Chất liệu chính', en: 'Primary materials' }, v: { vi: 'Đá cẩm thạch, đồng, gỗ óc chó', en: 'Marble, bronze, walnut wood' } },
      { k: { vi: 'Thời gian chế tác', en: 'Crafting time' }, v: { vi: '7 – 10 tuần', en: '7 – 10 weeks' } },
      { k: { vi: 'Bảo hành', en: 'Warranty' }, v: { vi: '3 năm bề mặt đá', en: '3-year stone surface warranty' } },
    ],
    swatches: ['texMarble', 'texBronze', 'texLinen'],
  },
  terra: {
    num: '05',
    title: { vi: 'BST Terra', en: 'Terra Collection' },
    category: { vi: 'Ngoài trời', en: 'Outdoor' },
    texture: 'sceneTerra',
    intro: { vi: 'Nội thất ngoài trời chịu thời tiết, giữ nguyên vẻ mộc của gỗ tự nhiên.', en: 'Weather-resistant outdoor furniture that keeps the raw beauty of natural wood.' },
    paragraphs: [
      { vi: 'Terra dành cho ban công, sân vườn hoặc khoảng sân trong — nơi ranh giới giữa trong nhà và ngoài trời được xoá nhoà. Gỗ được xử lý chống ẩm chuyên biệt mà không phủ lớp sơn bóng che mất vân gỗ tự nhiên.', en: 'Terra is made for balconies, gardens and courtyards — where the line between indoors and outdoors blurs. The wood is specially moisture-treated without a glossy coating that would hide its natural grain.' },
      { vi: 'Hệ đệm ngồi sử dụng vải ngoài trời kháng UV, có thể tháo rời để giặt theo mùa.', en: 'Seat cushions use UV-resistant outdoor fabric and are removable for seasonal washing.' },
    ],
    specs: [
      { k: { vi: 'Diện tích đề xuất', en: 'Suggested area' }, v: { vi: '10 – 25 m²', en: '10 – 25 m²' } },
      { k: { vi: 'Chất liệu chính', en: 'Primary materials' }, v: { vi: 'Gỗ xử lý ngoài trời', en: 'Outdoor-treated wood' } },
      { k: { vi: 'Thời gian chế tác', en: 'Crafting time' }, v: { vi: '5 – 7 tuần', en: '5 – 7 weeks' } },
      { k: { vi: 'Bảo hành', en: 'Warranty' }, v: { vi: '2 năm ngoài trời', en: '2-year outdoor warranty' } },
    ],
    swatches: ['texWalnut', 'texLinen', 'texLeather'],
  },
  nocturne: {
    num: '06',
    title: { vi: 'BST Nocturne', en: 'Nocturne Collection' },
    category: { vi: 'Phòng ngủ', en: 'Bedroom' },
    texture: 'sceneNocturne',
    intro: { vi: 'Tông tối, ánh đồng ấm — phiên bản đậm chất hơn của phòng ngủ đương đại.', en: 'Dark tones and warm bronze accents — a bolder take on the contemporary bedroom.' },
    paragraphs: [
      { vi: 'Nocturne dành cho gia chủ yêu thích không gian ngủ có chiều sâu thị giác hơn là sự tối giản thuần tuý. Điểm nhấn đồng chải xước xuất hiện ở tay nắm, chân giường và khung gương.', en: 'Nocturne is for homeowners who prefer visual depth over pure minimalism. Brushed bronze accents appear on handles, bed legs and the mirror frame.' },
      { vi: 'Bảng màu tối được cân bằng bằng ánh sáng gián tiếp gắn âm trần, tránh cảm giác nặng nề khi sử dụng vào ban đêm.', en: 'The dark palette is balanced with recessed indirect lighting, avoiding a heavy feel when used at night.' },
    ],
    specs: [
      { k: { vi: 'Diện tích đề xuất', en: 'Suggested area' }, v: { vi: '18 – 32 m²', en: '18 – 32 m²' } },
      { k: { vi: 'Chất liệu chính', en: 'Primary materials' }, v: { vi: 'Gỗ óc chó, đồng chải xước', en: 'Walnut wood, brushed bronze' } },
      { k: { vi: 'Thời gian chế tác', en: 'Crafting time' }, v: { vi: '6 – 8 tuần', en: '6 – 8 weeks' } },
      { k: { vi: 'Bảo hành', en: 'Warranty' }, v: { vi: '5 năm khung gỗ', en: '5-year wood frame warranty' } },
    ],
    swatches: ['texBronze', 'texWalnut', 'texLinen'],
  },
};
