/* L&D Ceramics — hệ thống song ngữ VI / EN.
   Mỗi phần tử có thể dịch được gắn data-i18n="khoá.đường.dẫn" trỏ vào
   object I18N bên dưới. applyLanguage() đọc khoá đó và:
   - nếu phần tử có data-i18n-attr="placeholder" (hoặc thuộc tính khác)
     thì set thuộc tính đó;
   - ngược lại set innerHTML (cho phép chứa thẻ <em>, <br>...).
   Ngôn ngữ được lưu ở localStorage (+ cookie dự phòng) để giữ nguyên khi
   chuyển trang. Bấm nút gạt sẽ reload lại trang hiện tại để áp dụng ngôn
   ngữ mới một cách chắc chắn. */

const I18N = {
  common: {
    navHome: {vi:'Trang chủ', en:'Home'},
    navSpaces: {vi:'Không gian', en:'Spaces'},
    navMaterials: {vi:'Chất liệu', en:'Materials'},
    navAbout: {vi:'Về chúng tôi', en:'About us'},
    navContact: {vi:'Liên hệ', en:'Contact'},
    navCta: {vi:'Đặt lịch tư vấn', en:'Book a Consultation'},
    viewDetails: {vi:'Xem chi tiết', en:'View details'},
    ctaFooterEyebrowGeneric: {vi:'Bắt đầu dự án của bạn', en:'Start your project'},
    ctaFooterBtn: {vi:'Đặt lịch tư vấn miễn phí', en:'Book a Free Consultation'},
    footerBrandDesc: {vi:'Nội thất may đo cho không gian sống thượng lưu. Gỗ, đồng và đá — chế tác thủ công tại Việt Nam.', en:'Bespoke interiors for refined living. Wood, bronze and stone — handcrafted in Vietnam.'},
    footerExploreTitle: {vi:'Khám phá', en:'Explore'},
    footerCompanyTitle: {vi:'Công ty', en:'Company'},
    footerContactTitle: {vi:'Liên hệ', en:'Contact'},
    footerLinkSpaces: {vi:'Không gian', en:'Spaces'},
    footerLinkMaterials: {vi:'Chất liệu', en:'Materials'},
    footerLinkAbout: {vi:'Về chúng tôi', en:'About us'},
    footerLinkStory: {vi:'Câu chuyện', en:'Our story'},
    footerLinkProjects: {vi:'Dự án tiêu biểu', en:'Featured projects'},
    footerLinkCareers: {vi:'Tuyển dụng', en:'Careers'},
    footerLinkWorkshop: {vi:'Xưởng: An Khánh, TP.HCM', en:'Workshop: An Khanh, HCMC'},
    footerCopyright: {vi:'© 2025 L&D Ceramics. Bản quyền thuộc về công ty.', en:'© 2025 L&D Ceramics. All rights reserved.'},
    footerCredit: {vi:'Thiết kế bởi L&D Studio', en:'Designed by L&D Studio'},
    breadcrumbHome: {vi:'Trang chủ', en:'Home'}
  },

  index: {
    heroEyebrow: {vi:'Bậc thầy Thiết kế Cuộc sống', en:'Masters of Living Design'},
    heroHeadline: {
      vi:'<span class="word"><span>Cuộc</span></span> <span class="word"><span>sống</span></span> <span class="word"><span>được</span></span><br> <span class="word"><span><em>tạo</em></span></span> <span class="word"><span><em>tác</em></span></span> <span class="word"><span>từ</span></span> <span class="word"><span>chất</span></span> <span class="word"><span>liệu</span></span>',
      en:'<span class="word"><span>Life</span></span> <span class="word"><span>is</span></span><br> <span class="word"><span><em>crafted</em></span></span> <span class="word"><span><em>from</em></span></span> <span class="word"><span>materials</span></span>'
    },
    heroSub: {vi:'L&D Ceramics kiến tạo không gian sống từ gỗ óc chó, đồng chải xước và đá tự nhiên — nội thất may đo dành riêng cho những không gian sống không thể sao chép.', en:'L&D Ceramics crafts living spaces from walnut wood, brushed bronze and natural stone — bespoke interiors made for homes that cannot be replicated.'},
    heroCtaPrimary: {vi:'Đặt lịch tư vấn', en:'Book a Consultation'},
    heroCtaGhost: {vi:'Xem không gian', en:'View Spaces'},
    scrollCue: {vi:'Cuộn xuống', en:'Scroll down'},
    philosophyEyebrow: {vi:'Triết lý thiết kế', en:'Design Philosophy'},
    philosophyQuote: {vi:'Chúng tôi không thiết kế nội thất. Chúng tôi <em>biên soạn</em> lại cách một không gian được sống trong đó, từng centimet một.', en:'We do not just design interiors. We <em>compose</em> the way a space is lived in, one centimetre at a time.'},

    panel1Num: {vi:'01 — BST Meridian', en:'01 — Meridian Collection'},
    panel1Title: {vi:'Phòng khách tĩnh tại', en:'A Living Room at Peace'},
    panel1Desc: {vi:'Gỗ óc chó nguyên khối, đường nét tối giản, dành cho không gian tiếp khách trầm và sâu.', en:'Solid walnut wood, minimal lines — for a living room that feels calm and grounded.'},

    panel2Num: {vi:'02 — BST Solstice', en:'02 — Solstice Collection'},
    panel2Title: {vi:'Phòng ngủ chữa lành', en:'A Bedroom That Heals'},
    panel2Desc: {vi:'Đá cẩm thạch xanh rêu kết hợp vải lanh tự nhiên, tạo nhịp thở chậm cho không gian nghỉ ngơi.', en:'Moss-green marble paired with natural linen, slowing the rhythm of rest.'},

    panel3Num: {vi:'03 — BST Atelier', en:'03 — Atelier Collection'},
    panel3Title: {vi:'Không gian làm việc', en:'A Space to Work'},
    panel3Desc: {vi:'Đồng chải xước và da thuộc Ý — chất liệu của những quyết định quan trọng.', en:'Brushed bronze and Italian leather — materials for the decisions that matter.'},

    panelEndEyebrow: {vi:'Còn nhiều hơn thế', en:'There is more'},
    panelEndTitle: {vi:'Khám phá toàn bộ dự án đã hoàn thiện', en:'Explore our complete portfolio'},
    panelEndBtn: {vi:'Xem tất cả không gian', en:'View All Spaces'},

    statLabel1: {vi:'Năm chế tác', en:'Years of craft'},
    statLabel2: {vi:'Dự án hoàn thiện', en:'Completed projects'},
    statLabel3: {vi:'% khách giới thiệu lại', en:'% client referral rate'},

    materialsTitle: {vi:'Chất liệu định hình đẳng cấp', en:'Materials That Define Refinement'},
    materialsNote: {vi:'Mỗi bề mặt được kiểm định thủ công trước khi đưa vào sản xuất. <a href="chat-lieu.html" style="color:var(--bronze); border-bottom:1px solid var(--bronze);">Xem toàn bộ thư viện chất liệu →</a>', en:'Every surface is hand-inspected before it enters production. <a href="chat-lieu.html" style="color:var(--bronze); border-bottom:1px solid var(--bronze);">View the full materials library →</a>'},
    swatchA: {vi:'Gỗ óc chó', en:'Walnut Wood'},
    swatchASub: {vi:'Massif', en:'Solid'},
    swatchB: {vi:'Đồng chải xước', en:'Brushed Bronze'},
    swatchBSub: {vi:'Brushed', en:'Brushed'},
    swatchC: {vi:'Đá cẩm thạch xanh', en:'Green Marble'},
    swatchCSub: {vi:'Verde', en:'Verde'},
    swatchD: {vi:'Da thuộc Ý', en:'Italian Leather'},
    swatchDSub: {vi:'Pieno Fiore', en:'Pieno Fiore'},
    swatchE: {vi:'Vải lanh tự nhiên', en:'Natural Linen'},
    swatchESub: {vi:'Belgian', en:'Belgian'},

    processTitle: {vi:'Quy trình bốn bước, không rút gọn', en:'Four Steps, Never Shortened'},
    processNote: {vi:'Từ khảo sát đến bàn giao — mỗi bước do đội ngũ thiết kế và nghệ nhân của L&D Ceramics trực tiếp thực hiện.', en:'From survey to handover — every step is carried out directly by L&D Ceramics designers and artisans.'},
    process1Title: {vi:'Tư vấn không gian', en:'Space Consultation'},
    process1Desc: {vi:'Khảo sát thực tế, lắng nghe thói quen sống và ánh sáng tự nhiên của từng không gian cụ thể.', en:'On-site survey, listening to lifestyle habits and the natural light of each specific space.'},
    process2Title: {vi:'Thiết kế ý tưởng', en:'Concept Design'},
    process2Desc: {vi:'Dựng phối cảnh và bảng chất liệu riêng, điều chỉnh cùng gia chủ trước khi chế tác.', en:'Building renderings and a dedicated material board, refined with the homeowner before production.'},
    process3Title: {vi:'Chế tác thủ công', en:'Handcrafting'},
    process3Desc: {vi:'Nghệ nhân gia công từng chi tiết tại xưởng, kiểm soát chất lượng ở mọi công đoạn.', en:'Artisans craft every detail at the workshop, with quality control at each stage.'},
    process4Title: {vi:'Lắp đặt & bàn giao', en:'Installation & Handover'},
    process4Desc: {vi:'Lắp đặt tại chỗ, hiệu chỉnh hoàn thiện và bàn giao cùng chế độ bảo hành riêng.', en:'On-site installation, final adjustments and handover with a dedicated warranty.'},

    testimonialQuote: {vi:'Không gian không còn giống bất kỳ căn nhà nào tôi từng thấy — mọi chất liệu đều có lý do để ở đó.', en:'The space no longer resembles any home I have seen before — every material is there for a reason.'},
    testimonialName: {vi:'Khách hàng L&D Ceramics — Biệt thự Q.2, TP.HCM', en:'L&D Ceramics client — Villa, District 2, HCMC'},

    ctaTitle: {vi:'Sẵn sàng kiến tạo không gian sống đẳng cấp của riêng bạn?', en:'Ready to create a living space of your own?'}
  },

  spaces: {
    h1: {vi:'Mỗi không gian là một bản thảo hoàn chỉnh', en:'Every Space Is a Complete Composition'},
    sub: {vi:'Sáu bộ sưu tập, sáu cách sống khác nhau — mỗi bộ được phát triển quanh một chất liệu chủ đạo, không có bản sao.', en:'Six collections, six ways of living — each built around one signature material, never duplicated.'},
    filterAll: {vi:'Tất cả', en:'All'},
    filterLiving: {vi:'Phòng khách', en:'Living Room'},
    filterBedroom: {vi:'Phòng ngủ', en:'Bedroom'},
    filterDining: {vi:'Phòng ăn', en:'Dining Room'},
    filterWork: {vi:'Làm việc', en:'Workspace'},
    filterOutdoor: {vi:'Ngoài trời', en:'Outdoor'},
    card1Title: {vi:'Phòng khách tĩnh tại', en:'A Living Room at Peace'},
    card1Cat: {vi:'Phòng khách · Gỗ óc chó', en:'Living Room · Walnut Wood'},
    card2Title: {vi:'Phòng ngủ chữa lành', en:'A Bedroom That Heals'},
    card2Cat: {vi:'Phòng ngủ · Đá cẩm thạch', en:'Bedroom · Marble'},
    card3Title: {vi:'Không gian làm việc', en:'A Space to Work'},
    card3Cat: {vi:'Làm việc · Đồng chải xước', en:'Workspace · Brushed Bronze'},
    card4Title: {vi:'Bàn ăn cho buổi tối kéo dài', en:'A Table for Long Evenings'},
    card4Cat: {vi:'Phòng ăn · Đá cẩm thạch, đồng', en:'Dining Room · Marble, Bronze'},
    card5Title: {vi:'Nội thất ngoài trời', en:'Outdoor Living'},
    card5Cat: {vi:'Ngoài trời · Gỗ xử lý chuyên biệt', en:'Outdoor · Weather-treated Wood'},
    card6Title: {vi:'Phòng ngủ tông tối', en:'A Bedroom in Dark Tones'},
    card6Cat: {vi:'Phòng ngủ · Gỗ óc chó, đồng', en:'Bedroom · Walnut, Bronze'},
    ctaEyebrow: {vi:'Chưa tìm thấy không gian phù hợp?', en:'Haven’t found the right space yet?'},
    ctaTitle: {vi:'Chúng tôi thiết kế riêng theo không gian thực tế của bạn', en:'We design around the real space you already have'}
  },

  materials: {
    h1: {vi:'Chất liệu là điểm khởi đầu của mọi thiết kế', en:'Materials Are Where Every Design Begins'},
    sub: {vi:'Chúng tôi chọn chất liệu trước khi vẽ bản phác đầu tiên — vì mỗi chất liệu đã tự mang trong nó một tính cách không gian riêng.', en:'We choose materials before drawing the first sketch — each one already carries its own character for the space.'},
    m1Title: {vi:'Gỗ óc chó', en:'Walnut Wood'},
    m1P1: {vi:'Vân gỗ đậm, kết cấu chắc, được xẻ và phơi tự nhiên trước khi đưa vào xưởng để hạn chế cong vênh theo thời gian.', en:'Deep grain, dense structure — sawn and air-dried naturally before entering the workshop to resist warping over time.'},
    m1P2: {vi:'Mỗi tấm gỗ đều có vân riêng biệt — hai món đồ nội thất từ cùng một mẻ gỗ sẽ không bao giờ giống hệt nhau.', en:'Every plank carries its own grain — no two pieces from the same batch will ever be identical.'},
    m1Tag2: {vi:'Bền trên 25 năm', en:'25+ year lifespan'},
    m1Tag3: {vi:'Xử lý dầu tự nhiên', en:'Natural oil finish'},
    m2Title: {vi:'Đồng chải xước', en:'Brushed Bronze'},
    m2P1: {vi:'Bề mặt được chải xước thủ công theo một hướng duy nhất, tạo hiệu ứng ánh kim dịu thay vì bóng loáng công nghiệp.', en:'Hand-brushed in a single direction, giving a soft metallic sheen rather than an industrial gloss.'},
    m2P2: {vi:'Đồng sẽ lên màu patina tự nhiên theo thời gian sử dụng — một đặc tính chúng tôi giữ lại thay vì phủ lớp chống oxy hoá.', en:'Bronze develops a natural patina over time — a trait we preserve rather than seal away with an anti-oxidation coat.'},
    m2Tag1: {vi:'Brushed finish', en:'Brushed finish'},
    m2Tag2: {vi:'Chịu lực cao', en:'High load-bearing'},
    m2Tag3: {vi:'Lên màu theo thời gian', en:'Patinas over time'},
    m3Title: {vi:'Đá cẩm thạch xanh', en:'Green Marble'},
    m3P1: {vi:'Vân đá xanh rêu tự nhiên, mỗi phiến được chọn thủ công để đảm bảo vân đá liền mạch khi ghép các mặt bàn lớn.', en:'Natural moss-green veining — each slab is hand-selected to keep the pattern seamless across larger surfaces.'},
    m3P2: {vi:'Bề mặt được xử lý chống thấm nhẹ, giữ độ mờ tự nhiên của đá thay vì đánh bóng gương — đúng tinh thần "thô mộc có chủ đích" của L&D Ceramics.', en:'Lightly sealed to stay water-resistant while keeping the stone\'s natural matte finish — true to L&D Ceramics\' "deliberately raw" spirit.'},
    m3Tag1: {vi:'Verde nguyên khối', en:'Solid Verde'},
    m3Tag2: {vi:'Chống thấm', en:'Water-resistant'},
    m3Tag3: {vi:'Vân liền mạch', en:'Seamless veining'},
    m4Title: {vi:'Da thuộc Ý', en:'Italian Leather'},
    m4P1: {vi:'Da pieno fiore giữ nguyên lớp vân tự nhiên của da, không mài để che khuyết điểm — vì vậy mỗi tấm da đều có cá tính riêng.', en:'Pieno fiore leather keeps its natural grain, never sanded to hide imperfections — so every hide has its own character.'},
    m4P2: {vi:'Chất liệu mềm dần và lên màu đậm hơn theo thời gian sử dụng, đặc biệt phù hợp với các món đồ tiếp xúc tay thường xuyên.', en:'It softens and deepens in colour with use — ideal for pieces touched often.'},
    m4Tag2: {vi:'Thuộc thực vật', en:'Vegetable-tanned'},
    m4Tag3: {vi:'Mềm theo thời gian', en:'Softens over time'},
    m5Title: {vi:'Vải lanh tự nhiên', en:'Natural Linen'},
    m5P1: {vi:'Sợi lanh dệt thô, thoáng khí, giữ được độ mềm tự nhiên mà không cần xử lý hoá chất làm mềm vải.', en:'Coarse-woven, breathable linen that stays naturally soft without chemical softening treatments.'},
    m5P2: {vi:'Đây là chất liệu duy nhất trong thư viện của chúng tôi có thể giặt và tái sử dụng lâu dài mà không mất form dáng ban đầu.', en:'The only material in our library that can be washed and reused long-term without losing its original shape.'},
    m5Tag1: {vi:'Dệt thô Bỉ', en:'Belgian coarse weave'},
    m5Tag2: {vi:'Thoáng khí', en:'Breathable'},
    m5Tag3: {vi:'Giặt được', en:'Washable'},
    ctaEyebrow: {vi:'Muốn xem chất liệu tận tay?', en:'Want to see the materials in person?'},
    ctaTitle: {vi:'Đặt lịch ghé xưởng để chạm vào từng mẫu chất liệu thật', en:'Book a workshop visit to touch every real material sample'}
  },

  about: {
    h1: {vi:'Nội thất không phải sản phẩm cuối cùng —<br>đó là một mối quan hệ lâu dài', en:'Furniture is not the final product —<br>it is a lasting relationship'},
    sub: {vi:'Với không gian sống của bạn, với chất liệu chúng tôi chọn, và với những đôi tay đã làm ra từng món đồ.', en:'With the space you live in, with the materials we choose, and with the hands that made every piece.'},
    introP1: {vi:'L&D là thương hiệu nội thất và gốm sứ cao cấp với nhiều năm phát triển tại Trung Quốc, dẫn dắt bởi đội ngũ kiến trúc sư và nghệ nhân tin rằng nội thất cao cấp không nằm ở thương hiệu in trên món đồ, mà ở việc từng chất liệu được chọn có lý do để tồn tại trong không gian đó.', en:'L&D is a fine furniture and ceramics brand with years of development in China, led by architects and artisans who believe fine furniture is not defined by the brand stamped on it, but by every material having a reason to exist in that space.'},
    introP2: {vi:'Chúng tôi chính thức có mặt tại Việt Nam để phục vụ trực tiếp khách hàng trong nước. Mỗi đơn hàng vẫn là một dự án riêng, được khảo sát, thiết kế và chế tác theo đúng không gian thật của khách hàng — không có phiên bản "gần giống" cho người khác.', en:'We have officially entered the Vietnamese market to serve local clients directly. Every order remains its own project — surveyed, designed and crafted for the client\'s exact space, with no "close enough" version made for someone else.'},
    storyCaption: {vi:'Văn phòng &amp; xưởng chế tác tại Việt Nam — nơi từng chi tiết được hoàn thiện bằng tay', en:'Our Vietnam office &amp; workshop — where every detail is finished by hand'},
    journeyTitle: {vi:'Hành trình', en:'Our Journey'},
    journeyNote: {vi:'Những cột mốc định hình cách L&D Ceramics làm việc hôm nay.', en:'The milestones that shaped how L&D Ceramics works today.'},
    mile1Title: {vi:'Thành lập tại Trung Quốc', en:'Founded in China'},
    mile1Desc: {vi:'Bắt đầu từ một xưởng thiết kế nhỏ tại Trung Quốc, chuyên gia công nội thất và gốm sứ đặt riêng cho kiến trúc sư trong khu vực.', en:'Started as a small design workshop in China, custom-crafting furniture and ceramics for local architects.'},
    mile2Title: {vi:'Mở rộng sang đá và kim loại', en:'Expanded into stone and metal'},
    mile2Desc: {vi:'Đưa đá tự nhiên và đồng chải xước vào quy trình sản xuất, hình thành ngôn ngữ chất liệu đặc trưng của thương hiệu.', en:'Introduced natural stone and brushed bronze into production, shaping the brand\'s signature material language.'},
    mile3Title: {vi:'Hợp tác cùng xưởng da Ý', en:'Partnered with an Italian tannery'},
    mile3Desc: {vi:'Bắt đầu nhập da thuộc pieno fiore trực tiếp, mở rộng danh mục sang các bộ sưu tập bọc da cao cấp.', en:'Began importing pieno fiore leather directly, expanding into premium leather-upholstered collections.'},
    mile4Title: {vi:'Ra mắt BST Atelier', en:'Launched the Atelier Collection'},
    mile4Desc: {vi:'Bộ sưu tập đầu tiên dành riêng cho không gian làm việc tại nhà, đánh dấu mở rộng sang phân khúc không gian đa năng.', en:'Our first collection dedicated to home workspaces, marking our move into multi-purpose living spaces.'},
    mile5Title: {vi:'Có mặt tại Việt Nam', en:'Enters the Vietnamese Market'},
    mile5Desc: {vi:'Mở văn phòng đại diện và xưởng chế tác tại An Khánh, TP.HCM, mang toàn bộ ngôn ngữ chất liệu của L&D đến khách hàng Việt Nam.', en:'Opened a representative office and workshop in An Khanh, HCMC, bringing L&D\'s full material language to Vietnamese clients.'},
    valuesTitle: {vi:'Giá trị cốt lõi', en:'Core Values'},
    v1Title: {vi:'Thủ công', en:'Handcrafted'},
    v1Desc: {vi:'Mỗi món đồ đi qua tay nghệ nhân ở ít nhất ba công đoạn, không qua dây chuyền tự động hoá hoàn toàn.', en:'Every piece passes through an artisan\'s hands at a minimum of three stages, never a fully automated line.'},
    v2Title: {vi:'Bền vững', en:'Sustainable'},
    v2Desc: {vi:'Gỗ được thu mua từ nguồn khai thác có kiểm soát, ưu tiên chất liệu có thể sửa chữa thay vì thay thế.', en:'Wood is sourced from controlled harvesting, favouring materials that can be repaired rather than replaced.'},
    v3Title: {vi:'Cá nhân hoá', en:'Personalised'},
    v3Desc: {vi:'Không có hai dự án giống nhau hoàn toàn — kích thước, chất liệu và chi tiết luôn theo không gian thật.', en:'No two projects are ever identical — dimensions, materials and details always follow the real space.'},
    v4Title: {vi:'Minh bạch', en:'Transparent'},
    v4Desc: {vi:'Báo giá theo từng hạng mục cụ thể, không gộp chung để khách hàng luôn biết mình trả tiền cho điều gì.', en:'Quotes are itemised, never bundled, so clients always know exactly what they are paying for.'},
    teamTitle: {vi:'Đội ngũ dẫn dắt', en:'Our Leadership'},
    teamNote: {vi:'Thông tin đội ngũ trong bản demo này là placeholder — bạn thay bằng tên và ảnh thật của công ty mình.', en:'Team information in this demo is placeholder text — replace it with your own team\'s real names and photos.'},
    team1Name: {vi:'Tên người sáng lập', en:'Founder\'s Name'},
    team1Role: {vi:'Nhà sáng lập &amp; Giám đốc sáng tạo', en:'Founder &amp; Creative Director'},
    team1Desc: {vi:'Định hướng thẩm mỹ và ngôn ngữ chất liệu xuyên suốt các bộ sưu tập của L&D Ceramics.', en:'Shapes the aesthetic direction and material language across every L&D Ceramics collection.'},
    team2Name: {vi:'Tên trưởng xưởng', en:'Workshop Lead\'s Name'},
    team2Role: {vi:'Trưởng xưởng chế tác', en:'Head of Workshop'},
    team2Desc: {vi:'Trực tiếp giám sát chất lượng ở từng công đoạn gia công thủ công tại xưởng.', en:'Directly oversees quality at every stage of handcrafting in the workshop.'},
    team3Name: {vi:'Tên trưởng phòng thiết kế', en:'Design Lead\'s Name'},
    team3Role: {vi:'Trưởng phòng thiết kế', en:'Head of Design'},
    team3Desc: {vi:'Làm việc trực tiếp với khách hàng từ khảo sát không gian đến bản phối cảnh cuối cùng.', en:'Works directly with clients from the initial site survey through to the final rendering.'},
    ctaEyebrow: {vi:'Muốn làm việc cùng chúng tôi?', en:'Want to work with us?'},
    ctaTitle: {vi:'Kể cho chúng tôi nghe về không gian bạn đang nghĩ đến', en:'Tell us about the space you have in mind'}
  },

  contact: {
    h1: {vi:'Bắt đầu cuộc trò chuyện về không gian của bạn', en:'Start a Conversation About Your Space'},
    sub: {vi:'Để lại thông tin — đội ngũ thiết kế sẽ phản hồi trong vòng 1–2 ngày làm việc để sắp lịch khảo sát.', en:'Leave your details — our design team will respond within 1–2 business days to schedule a site visit.'},
    labelWorkshop: {vi:'Xưởng', en:'Workshop'},
    valueWorkshop: {vi:'73 Nguyễn Cơ Thạch, An Khánh<br>TP. Hồ Chí Minh<small>Tham quan xưởng theo lịch hẹn</small>', en:'73 Nguyen Co Thach, An Khanh<br>Ho Chi Minh City<small>Workshop visits by appointment</small>'},
    labelPhone: {vi:'Điện thoại', en:'Phone'},
    valuePhone: {vi:'028 3xxx xxxx<small>Thứ 2 – Thứ 7, 9:00 – 18:00</small>', en:'028 3xxx xxxx<small>Mon – Sat, 9:00 – 18:00</small>'},
    labelEmail: {vi:'Email', en:'Email'},
    valueEmail: {vi:'hello@lndceramics.com<small>Phản hồi trong 1–2 ngày làm việc</small>', en:'hello@lndceramics.com<small>We reply within 1–2 business days</small>'},
    labelSocial: {vi:'Mạng xã hội', en:'Social'},
    valueSocial: {vi:'Instagram · Pinterest · Facebook<small>@lndceramics (placeholder)</small>', en:'Instagram · Pinterest · Facebook<small>@lndceramics (placeholder)</small>'},
    fieldName: {vi:'Họ và tên', en:'Full name'},
    errName: {vi:'Vui lòng nhập họ tên.', en:'Please enter your full name.'},
    fieldPhone: {vi:'Số điện thoại', en:'Phone number'},
    errPhone: {vi:'Vui lòng nhập số điện thoại.', en:'Please enter your phone number.'},
    fieldEmail: {vi:'Email', en:'Email'},
    errEmail: {vi:'Vui lòng nhập email hợp lệ.', en:'Please enter a valid email.'},
    fieldInterest: {vi:'Loại không gian quan tâm', en:'Space you are interested in'},
    interestUnsure: {vi:'Chưa xác định — cần tư vấn', en:'Not sure yet — need advice'},
    fieldMessage: {vi:'Nội dung', en:'Message'},
    messagePlaceholder: {vi:'Diện tích, phong cách mong muốn, thời gian dự kiến...', en:'Area size, preferred style, expected timeline...'},
    errMessage: {vi:'Vui lòng mô tả ngắn gọn nhu cầu của bạn.', en:'Please briefly describe your needs.'},
    submitBtn: {vi:'Gửi yêu cầu tư vấn', en:'Send Request'},
    formNote: {vi:'Lưu ý kỹ thuật: đây là form tĩnh (không có backend). Trước khi triển khai thật trên VPS, hãy nối form này với một dịch vụ nhận form (ví dụ Formspree, Web3Forms) hoặc một endpoint xử lý riêng — xem phần "Kết nối form liên hệ" trong README.md đi kèm.', en:'Technical note: this is a static form (no backend). Before going live, connect it to a form service (e.g. Formspree, Web3Forms) or your own endpoint — see the "Contact form setup" section in the included README.md.'}
  },

  detail: {
    backLink: {vi:'← Xem tất cả không gian', en:'← View all spaces'},
    ctaEyebrow: {vi:'Muốn có không gian tương tự?', en:'Want a space like this?'},
    ctaTitle: {vi:'Đặt lịch để chúng tôi khảo sát không gian thực tế của bạn', en:'Book a visit for us to survey your real space'}
  }
};

(function(){
  /* Lưu ngôn ngữ ở cả localStorage lẫn cookie — nếu trình duyệt chặn cái
     này (ví dụ mở file trực tiếp bằng file://, hoặc chế độ riêng tư) thì
     vẫn còn cái kia, tránh việc bị "quên" ngôn ngữ khi sang trang khác. */
  function readStored(){
    try{
      const v = localStorage.getItem('lnd_lang');
      if(v) return v;
    }catch(e){}
    try{
      const m = document.cookie.match(/(?:^|;\s*)lnd_lang=([^;]+)/);
      if(m) return decodeURIComponent(m[1]);
    }catch(e){}
    return null;
  }

  function writeStored(lang){
    try{ localStorage.setItem('lnd_lang', lang); }catch(e){}
    try{ document.cookie = 'lnd_lang=' + lang + '; path=/; max-age=31536000'; }catch(e){}
  }

  function getLang(){ return readStored() || 'vi'; }

  function resolve(key){
    return key.split('.').reduce((o,k) => (o && o[k] !== undefined) ? o[k] : undefined, I18N);
  }

  function applyLanguage(lang){
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const entry = resolve(el.getAttribute('data-i18n'));
      if(!entry || entry[lang] == null) return;
      const attr = el.getAttribute('data-i18n-attr');
      if(attr){ el.setAttribute(attr, entry[lang]); }
      else { el.innerHTML = entry[lang]; }
    });
    document.querySelectorAll('.lang-toggle').forEach(btn => btn.setAttribute('data-active', lang));
    window.__currentLang = lang;
    document.dispatchEvent(new CustomEvent('langchange', {detail:{lang}}));
  }

  window.I18N = I18N;
  window.getLang = getLang;
  window.applyLanguage = applyLanguage;

  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getLang());
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = getLang() === 'vi' ? 'en' : 'vi';
        writeStored(next);
        location.reload();
      });
    });
  });
})();
