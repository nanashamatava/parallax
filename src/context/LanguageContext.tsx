import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ka";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations["en"]) => string;
}

const translations = {
  en: {
    // Header
    logo_sub: "3D WALLPAPERS MARKET",
    utc_clock: "TRANSMITTING UTC...",
    search_placeholder: "Search infinite voids...",
    alert_favs_prefix: "Viewing your",
    alert_favs_suffix: "favorited spatial licenses inside catalog grid.",
    cadet_login: "Cadet Login",
    console: "Console",

    // Language Toggle
    lang_toggle_btn: "Language / ენა",

    // Hero
    hero_badge: "Premium HD 3D Space Wallpaper Marketplace",
    hero_title_1: "An Immersive Space",
    hero_title_2: "Wallpapers Galaxy",
    hero_desc: "Elevate your smartphones, AMOLED monitors, and tablets, with luxury parallax 3D wallpapers. Realized by procedural volumetric shaders rendering moons, galaxies, and black holes.",
    btn_browse: "Browse Wallpapers (300)",
    btn_vip_privileges: "Activate VIP Privileges",
    vip_success: "VIP Tier Bestowed successfully! Seamlessly acquire premium limited licenses.",
    stat_collections_label: "Curated Systems",
    stat_collections_val: "30 Collections",
    stat_renders_label: "Uncompressed Renders",
    stat_renders_val: "8K / AMOLED",
    stat_pilots_label: "Global Pioneers",
    stat_pilots_val: "45k+ Pilots",

    // Limited drop promo section
    limited_drop_badge: "Limited Edition Collectible Drop",
    limited_drop_title: "Saturnian Singularity Warp #10",
    limited_drop_desc: "Our weekly cosmic release is expiring soon. Access uncompressed 8K HDR formats formatted exclusively for flagship AMOLED folding devices.",
    time_limit: "Time Limit",
    decoding: "DECODING...",
    chrono_saturnia_title: "Chrono-Orbit Saturnia Elite",
    saturn_limited_desc: "Complete vector lighting layers including planetary dust particles.",
    btn_buy_collectible: "Buy Collectible",
    saturn_refresh_alert: "Saturn limited catalog is being refreshed.",

    // Interactive 360 Planet Viewer
    viewer_badge: "Advanced Holographic Visual Tool",
    viewer_title: "Visualizing Worlds in 360° Degrees",
    viewer_desc: "Unpack structural layers of diverse planetary body systems. Drag your mouse over the globe interface to orbit the surface grid, or modify the direct solar radiation vectors using the light controller below.",
    viewer_feat: "Complete procedural vectors rendering.",

    // Main Catalog and Search
    catalog_title: "Explore Deep-Space Collections",
    catalog_sub: "Select from 30 thematic space catalogs containing 10 premium designs each",
    btn_refinement_filters: "Refined filters",
    btn_hide_filters: "Hide Refinements",

    // Advanced Filters Panel
    filter_screen_format: "Screen Format",
    filter_device_optimization: "Device Optimization",
    filter_price_limit: "Price Limit",
    filter_free: "FREE",
    filter_max: "MAX: $15.00",
    filter_sorting_priority: "Sorting Priority",
    sort_most_downloaded: "Most Downloaded",
    sort_latest: "Latest Releases",
    sort_best_selling: "Best Selling",

    // Categories list sidebar
    categories_title: "30 Celestial Categories",
    show_all_categories: "🚀 Show All Categories",
    designs_count: "10 designs",

    // Active Category Details Block
    category_galactic_archives: "Galactic Archives",
    category_archives_desc: "Exhaustive portfolio across solar layers, star systems, and theoretical spacetime bridge dimensions.",
    wallpapers_found: "Wallpapers Found",

    // No Wallpapers
    no_wallpapers_found: "No celestial wallpapers correspond to these filter rules.",
    btn_reset_grid: "Reset Grid specifications",

    // Newsletter Section
    newsletter_badge: "Galactic newsletter bulletins",
    newsletter_title: "Stay Informed on Limited Collectibles",
    newsletter_desc: "We periodically deploy exclusive 3D wallpaper drops with countdown limits. Register your email beacon below to guarantee receipt of transmission keys.",
    newsletter_success: "Subscription sequence compiled! Check your inbox.",
    newsletter_placeholder: "Enter spacepilot mail...",
    btn_subscribe: "Subscribe",

    // Footer
    footer_corp: "© 2026 COSMIC ORBITAL WALLPAPERS INC. SECURED MARKETPLACE MATRIX.",
    footer_ssl: "Secure SSL Protocol",
    footer_refund: "Refund Coordinates",
    footer_usage: "Usage Terms",

    // Wallpaper Card / Modal
    tag_premium: "PREMIUM",
    tag_limited: "LIMITED",
    tag_bestseller: "BEST SELLER",
    tag_trending: "TRENDING",
    tag_new: "NEW ARRIVAL",
    rating_label: "RATING",
    downloads_label: "DOWNLOADS",
    resolution_label: "RESOLUTION",
    device_label: "DEVICE",
    btn_preview: "Preview Design",
    btn_add_basket: "Add Basket",
    btn_quick_buy: "Quick Buy",

    // Cart And Checkout Modal
    cart_header: "Basket",
    cart_success_header: "Transmission Success",
    cart_close: "Close",
    cart_done: "Done",
    cart_empty_p: "Your spacecraft cargo hold is currently empty.",
    cart_explore_btn: "Explore Galaxies",
    cart_free_price: "Free",
    cart_promo_opt: "Optional coupon code",
    cart_promo_placeholder: "Insert discount coupons... (use: COSMOS20)",
    cart_promo_transmit: "Transmit",
    cart_invalid_promo: "Invalid discount coupon.",
    cart_coupon_active: "Protocol Active",
    cart_coupon_delete: "Delete",
    cart_subtotal: "Subtotal",
    cart_discount: "Spatial Discount Code",
    cart_total_price: "Invoice Total Amount",
    cart_disclaimer: "🔑 High-speed immediate delivery of your .PNG wallpaper packet once confirmed.",
    cart_btn_gateway: "Select Gateway",
    cart_btn_pay: "Pay Now",
    cart_success_desc: "Your downloading license is active. Order ID is:",
    cart_receipt_title: "Receipt:",
    cart_email: "Email:",
    cart_payment_method: "Payment Gateway:",
    cart_payment_total: "Amount Paid:",
    cart_btn_done: "Close Panel",
    cart_duplicate_alert: "already cataloged within basket cargo holds.",
    cart_added_alert: "linked up to checkout cargo hold.",

    // User Auth Modal
    auth_title_login: "Cadet Login",
    auth_title_register: "Register Cadet",
    auth_email: "Cadet Email Beacon",
    auth_name: "Pilot Callsign Name",
    auth_btn_login: "Access Terminal",
    auth_btn_register: "Enlist Cadet",
    auth_switch_register: "No callsigned account? Enlist in Spaceflight",
    auth_switch_login: "Already callsigned? Access Terminal",
    auth_profile_title: "Space Cadet Profile",
    auth_membership: "Membership Level:",
    auth_status_active: "Active",
    auth_vip_level: "VIP Level:",
    auth_expires: "Expires:",
    auth_downloads_unlocked: "Unlocked Downloads:",
    auth_no_downloads: "No downloads acquired yet.",
    auth_history: "Purchase History:",
    auth_no_history: "No transactions logged.",
    auth_btn_logout: "Sever Connection",

    // Admin Dashboard
    admin_title: "High Administrative Command Terminal",
    admin_nav_general: "Database Monitor",
    admin_nav_wallpapers: "Add Wallpaper",
    admin_nav_promos: "Promo Codes",
    admin_status_total: "Total Wallpapers",
    admin_status_premium: "Premium",
    admin_status_limited: "Limited",
    admin_tbl_title: "Title & ID",
    admin_tbl_category: "Category",
    admin_tbl_price: "Price",
    admin_tbl_actions: "Actions",
    admin_btn_edit: "Edit",
    admin_btn_delete: "Delete",
    admin_lbl_edit: "Edit Product Metadata",
    admin_lbl_add: "Deploy New Wallpaper",
    admin_input_title: "Wallpaper Title",
    admin_input_desc: "Description text",
    admin_input_category: "Category",
    admin_input_price: "Price ($0 to $15)",
    admin_input_res: "Resolution",
    admin_input_devices: "Compatible Devices",
    admin_input_premium: "Premium Design (VIP access)",
    admin_input_limited: "Limited Edition (Includes countdown)",
    admin_btn_save: "Save",
    admin_btn_add_new: "Transmit New Wallpaper Asset",

    // General Words
    or: "or",
    cancel: "Cancel",

    // Collection names & descriptions
    col_name_earth: "Earth",
    col_desc_earth: "Stunning 3D low orbit and deep space renders of our home planet.",
    col_name_moon: "Moon",
    col_desc_moon: "High-contrast craters, lunar dust, and dramatic sun flares on Earth's satellite.",
    col_name_sun: "Sun",
    col_desc_sun: "Radiant solar flares, magnetic storms, and thermonuclear majesty in 3D 8K.",
    col_name_mars: "Mars",
    col_desc_mars: "Dynamic deserts of the Red Planet, Mount Olympus, and future colonies.",
    col_name_jupiter: "Jupiter",
    col_desc_jupiter: "Violent gas swirls, the Great Red Spot, and oceanic moons in ultra-detail.",
    col_name_saturn: "Saturn",
    col_desc_saturn: "Majestic ring systems, hexagonal polar vortices, and icy moons.",
    col_name_uranus: "Uranus",
    col_desc_uranus: "Pale blue ice giant with a tilted axis and glowing rings.",
    col_name_neptune: "Neptune",
    col_desc_neptune: "Mysterious worlds of the deep blue gas giant, supersonic winds, and Triton.",
    col_name_comets: "Comets",
    col_desc_comets: "Deep space ice travelers under solar wind with glowing gas tails.",
    col_name_galaxy: "Galaxy",
    col_desc_galaxy: "Epic cosmic spiral arms, dark matter halos, and stellar cores.",
    col_name_stars: "Stars",
    col_desc_stars: "Twinkling star clusters, neutron stars, and hypergiants.",
    col_name_nebula: "Nebula",
    col_desc_nebula: "Glowing interstellar dust clouds of ionized gas and star birthplaces.",
    col_name_black_hole: "Black Hole",
    col_desc_black_hole: "Gravitational lensing, event horizons, and relativistic plasma jets.",
    col_name_meteor_shower: "Meteor Shower",
    col_desc_meteor_shower: "Atmospheric fire streaks, dust radiation fluxes, and ionized gas trails.",
    col_name_space_exploration: "Space Exploration",
    col_desc_space_exploration: "Colossal starships, orbital docks, and colonizer fleets.",
    col_name_astronaut: "Astronaut",
    col_desc_astronaut: "Daring explorers, spacewalks, and lunar footsteps.",
    col_name_satellite: "Satellite",
    col_desc_satellite: "Laser communication arrays, Hubble telescopes, and ISS views.",
    col_name_earth_from_space: "Earth from Space",
    col_desc_earth_from_space: "Amazing orbital arc perspectives of Earth, thin blue atmospheric lines.",
    col_name_full_moon: "Full Moon",
    col_desc_full_moon: "Mysterious and fully illuminated high-contrast silver discs.",
    col_name_moon_phases: "Moon Phases",
    col_desc_moon_phases: "Waning, waxing, half, and crescent moon phases with deep space depth.",
    col_name_cosmic_lights: "Cosmic Lights",
    col_desc_cosmic_lights: "Holographic space-time beams, gamma-ray bursts, and pulsar beams.",
    col_name_aurora: "Aurora",
    col_desc_aurora: "Geomagnetic sky dancers, emerald and violet ribbons of solar particles.",
    col_name_deep_space: "Deep Space",
    col_desc_deep_space: "Hubble and James Webb ultra-deep field shots from primordial times.",
    col_name_milky_way: "Milky Way",
    col_desc_milky_way: "Central bar of our home galaxy, dust lanes, and Sagittarius A*.",
    col_name_planetary_system: "Planetary System",
    col_desc_planetary_system: "Orbital arrays, multi-planet eclipses, and planet alignments.",
    col_name_supernova: "Supernova",
    col_desc_supernova: "Stellar cataclysms, powerful shockwaves in dust shells.",
    col_name_shooting_stars: "Shooting Stars",
    col_desc_shooting_stars: "Instantaneous light streaks passing through the cosmic void.",
    col_name_exoplanets: "Exoplanets",
    col_desc_exoplanets: "Habitable Super-Earths, double-sun rocky deserts, and lava oceans.",
    col_name_wormhole: "Wormhole",
    col_desc_wormhole: "Space-time warp metrics, theoretical Einstein-Rosen bridges.",
    col_name_dark_space: "Dark Space",
    col_desc_dark_space: "Pure dark themes, minimalist stars, and absolute luxury black voids."
  },
  ka: {
    // Header
    logo_sub: "3D ფონების ბაზარი",
    utc_clock: "გადაიცემა UTC...",
    search_placeholder: "მოძებნეთ უსასრულო სივრცეებში...",
    alert_favs_prefix: "თქვენი",
    alert_favs_suffix: "ფავორიტი კოსმოსური ლიცენზიის ნახვა კატალოგის ბადეში.",
    cadet_login: "კადეტის ავტორიზაცია",
    console: "კონსოლი",

    // Language Toggle
    lang_toggle_btn: "ენა / Language",

    // Hero
    hero_badge: "პრემიუმ HD 3D კოსმოსური ფონების ბაზარი",
    hero_title_1: "კოსმოსური Parallax",
    hero_title_2: "ფონების გალაქტიკა",
    hero_desc: "გააფორმეთ თქვენი სმარტფონები, AMOLED მონიტორები და პლანშეტები მდიდრული parallax 3D ფონებით. შექმნილია მოცულობითი შადერებით, რომლებიც ასახავს მთვარეებს, გალაქტიკებსა და შავ ხვრელებს.",
    btn_browse: "კატალოგის ძიება (300)",
    btn_vip_privileges: "VIP პრივილეგიების გააქტიურება",
    vip_success: "VIP სტატუსი წარმატებით მოგენიჭათ! შეგიძლიათ უფასოდ მიიღოთ პრემიუმ ლიმიტირებული ლიცენზიები.",
    stat_collections_label: "შექმნილი სისტემები",
    stat_collections_val: "30 კოლექცია",
    stat_renders_label: "დაუკუმშავი რენდერები",
    stat_renders_val: "8K / AMOLED",
    stat_pilots_label: "გლობალური პიონერები",
    stat_pilots_val: "45k+ პილოტი",

    // Limited drop promo section
    limited_drop_badge: "ლიმიტირებული გამოშვება",
    limited_drop_title: "სატრუნის სინგულარული ვარპი #10",
    limited_drop_desc: "ჩვენი ყოველკვირეული კოსმოსური გამოშვება მალე იწურება. მიიღეთ დაუკუმშავი 8K HDR ფორმატები, სპეციალურად შექმნილი ფლაგმანური AMOLED მოქნილი მოწყობილობებისთვის.",
    time_limit: "დროის ლიმიტი",
    decoding: "დეკოდირება...",
    chrono_saturnia_title: "ქრონო-ორბიტალური სატურნი ელიტ",
    saturn_limited_desc: "სრული ვექტორული გამოსახულება, პლანეტარული მტვრის ნაწილაკების ჩათვლით.",
    btn_buy_collectible: "კოლექციონირების ყიდვა",
    saturn_refresh_alert: "სატურნის შეზღუდული კატალოგი ახლდება.",

    // Interactive 360 Planet Viewer
    viewer_badge: "ჰოლოგრაფიული ვიზუალიზატორი",
    viewer_title: "სამყაროების 360° ვიზუალიზაცია",
    viewer_desc: "შეისწავლეთ სხვადასხვა პლანეტარული სხეულების სტრუქტურული ფენები. ამოძრავეთ მაუსი გლობუსზე ორბიტალური ბადის დასატრიალებლად, ან შეცვალეთ მზის რადიაციის ვექტორები ქვემოთ მოცემული განათების კონტროლერით.",
    viewer_feat: "სრული პროცედურული ვექტორული რენდერი.",

    // Main Catalog and Search
    catalog_title: "კოსმოსური კოლექციების ძიება",
    catalog_sub: "აირჩიეთ 30 თემატური კოსმოსური კატალოგიდან, თითოეულში 10 პრემიუმ დიზაინია",
    btn_refinement_filters: "ფილტრების ჩვენება",
    btn_hide_filters: "ფილტრების დამალვა",

    // Advanced Filters Panel
    filter_screen_format: "ეკრანის ფორმატი",
    filter_device_optimization: "ოპტიმიზაცია",
    filter_price_limit: "ფასის ლიმიტი",
    filter_free: "უფასო",
    filter_max: "მაქს: $15.00",
    filter_sorting_priority: "სორტირება",
    sort_most_downloaded: "ყველაზე ჩამოტვირთული",
    sort_latest: "ახალი დამატებული",
    sort_best_selling: "ბესტსელერები",

    // Categories list sidebar
    categories_title: "30 კოსმოსური კატეგორია",
    show_all_categories: "🚀 ყველა კატეგორიის ჩვენება",
    designs_count: "10 დიზაინი",

    // Active Category Details Block
    category_galactic_archives: "გალაქტიკური არქივები",
    category_archives_desc: "სრული პორტფოლიო მზის სისტემების, ვარსკვლავური სისტემებისა და თეორიული სივრცე-დროის ხიდების განზომილებებიდან.",
    wallpapers_found: "ფონი ნაპოვნია",

    // No Wallpapers
    no_wallpapers_found: "ამ ფილტრების შესაბამისი ფონები ვერ მოიძებნა.",
    btn_reset_grid: "პარამეტრების გასუფთავება",

    // Newsletter Section
    newsletter_badge: "გალაქტიკური საინფორმაციო ბიულეტენი",
    newsletter_title: "იყავით პირველი, ვინც შეიტყობს ლიმიტირებულ გამოშვებებზე",
    newsletter_desc: "ჩვენ პერიოდულად ვუშვებთ ექსკლუზიურ 3D ფონებს დროის ლიმიტით. დაარეგისტრირეთ თქვენი ელექტრონული ფოსტა, რათა მიიღოთ უახლესი ამბები.",
    newsletter_success: "თქვენ წარმატებით გამოიწერეთ სიახლეები! შეამოწმეთ თქვენი ელ-ფოსტა.",
    newsletter_placeholder: "შეიყვანეთ ელ-ფოსტის მისამართი...",
    btn_subscribe: "გამოწერა",

    // Footer
    footer_corp: "© 2026 COSMIC ORBITAL WALLPAPERS INC. დაცული საკუთრება.",
    footer_ssl: "დაცული SSL პროტოკოლი",
    footer_refund: "დაბრუნების წესები",
    footer_usage: "გამოყენების პირობები",

    // Wallpaper Card / Modal
    tag_premium: "პრემიუმი",
    tag_limited: "ლიმიტირებული",
    tag_bestseller: "ბესტსელერი",
    tag_trending: "პოპულარული",
    tag_new: "ახალი",
    rating_label: "რეიტინგი",
    downloads_label: "ჩამოტვირთვები",
    resolution_label: "გაფართოება",
    device_label: "მოწყობილობა",
    btn_preview: "ფონის ნახვა",
    btn_add_basket: "კალათაში დამატება",
    btn_quick_buy: "სწრაფი შესყიდვა",

    // Cart And Checkout Modal
    cart_header: "კალათა და ანგარიშსწორება",
    cart_success_header: "გადახდა წარმატებით დასრულდა",
    cart_close: "დახურვა",
    cart_done: "დასრულება",
    cart_empty_p: "თქვენი კოსმოსური კალათა ამჟამად ცარიელია.",
    cart_explore_btn: "გალაქტიკების ძიება",
    cart_free_price: "უფასო",
    cart_promo_opt: "ფასდაკლების კუპონი",
    cart_promo_placeholder: "ჩაწერეთ პრომო კოდი... (მაგ: COSMOS20)",
    cart_promo_transmit: "გაგზავნა",
    cart_invalid_promo: "კოდი არასწორი ან ვადაგასულია.",
    cart_coupon_active: "პრომოკოდი აქტიურია",
    cart_coupon_delete: "წაშლა",
    cart_subtotal: "ჯამი",
    cart_discount: "პრომოკოდის ფასდაკლება",
    cart_total_price: "საბოლოო ფასი",
    cart_disclaimer: "🔑 დადასტურებისთანავე მიიღებთ .PNG ფორმატის მაღალი ხარისხის ფაილებს.",
    cart_btn_gateway: "გადახდაზე გადასვლა",
    cart_btn_pay: "გადახდა",
    cart_success_desc: "თქვენი ჩამოსატვირთი ლიცენზია აქტიურია. შეკვეთის ნომერია:",
    cart_receipt_title: "ქვითარი:",
    cart_email: "ელ.ფოსტა:",
    cart_payment_method: "გადახდის მეთოდი:",
    cart_payment_total: "სულ გადახდილია:",
    cart_btn_done: "პანელის დახურვა",
    cart_duplicate_alert: "უკვე კალათაშია.",
    cart_added_alert: "დაემატა კალათაში.",

    // User Auth Modal
    auth_title_login: "კადეტის ავტორიზაცია",
    auth_title_register: "რეგისტრაცია",
    auth_email: "ელ-ფოსტა",
    auth_name: "Pilot სახელი და მეტსახელი",
    auth_btn_login: "შესვლა",
    auth_btn_register: "რეგისტრაცია",
    auth_switch_register: "არ გაქვთ ანგარიში? გაიარეთ რეგისტრაცია",
    auth_switch_login: "უკვე დარეგისტრირებულხართ? შედით სისტემაში",
    auth_profile_title: "კოსმოსური კადეტის პროფილი",
    auth_membership: "წევრობის დონე:",
    auth_status_active: "აქტიური",
    auth_vip_level: "VIP დონე:",
    auth_expires: "ვადა იწურება:",
    auth_downloads_unlocked: "ჩამოტვირთვები:",
    auth_no_downloads: "ჯერ არაფერია ჩამოტვირთული.",
    auth_history: "შესყიდვების ისტორია:",
    auth_no_history: "ტრანზაქციები არ მოიძებნა.",
    auth_btn_logout: "კავშირის გაწყვეტა",

    // Admin Dashboard
    admin_title: "ადმინისტრაციული მართვის პანელი",
    admin_nav_general: "მონაცემთა ბაზა",
    admin_nav_wallpapers: "ახალი ფონის დამატება",
    admin_nav_promos: "პრომო კოდები",
    admin_status_total: "სულ ფონები",
    admin_status_premium: "პრემიუმი",
    admin_status_limited: "ლიმიტირებული",
    admin_tbl_title: "დასახელება და ID",
    admin_tbl_category: "კატეგორია",
    admin_tbl_price: "ფასი",
    admin_tbl_actions: "მოქმედება",
    admin_btn_edit: "რედაქტირება",
    admin_btn_delete: "წაშლა",
    admin_lbl_edit: "მონაცემების რედაქტირება",
    admin_lbl_add: "ახალი ფონის განთავსება",
    admin_input_title: "ფონის დასახელება",
    admin_input_desc: "აღწერა",
    admin_input_category: "კატეგორია",
    admin_input_price: "ფასი ($0 - $15)",
    admin_input_res: "გაფართოება",
    admin_input_devices: "თავსებადი მოწყობილობები",
    admin_input_premium: "Premium დიზაინი (საჭიროებს VIP სტატუსს)",
    admin_input_limited: "ლიმიტირებული გამოშვება (ითვლის დროს)",
    admin_btn_save: "შენახვა",
    admin_btn_add_new: "ახალი ფონის დამატება",

    // General Words
    or: "ან",
    cancel: "გაუქმება",

    // Collection names & descriptions
    col_name_earth: "დედამიწა",
    col_desc_earth: "ჩვენი მშობლიური პლანეტის შთამბეჭდავი 3D რენდერები დაბალი ორბიტიდან და ღრმა კოსმოსიდან.",
    col_name_moon: "მთვარე",
    col_desc_moon: "კონტრასტული კრატერები, მთვარის მტვერი და დრამატული განათება დედამიწის თანამგზავრზე.",
    col_name_sun: "მზე",
    col_desc_sun: "კაშკაშა მზის აფეთქებები, მაგნიტური ქარიშხლები და თერმობირთვული სიდიადე 3D 8K-ში.",
    col_name_mars: "მარსი",
    col_desc_mars: "წითელი პლანეტის დინამიკური უდაბნოები, ოლიმპოს მთა და მომავლის კოლონიები.",
    col_name_jupiter: "იუპიტერი",
    col_desc_jupiter: "გაზის ქარიშხლიანი მორევები, დიდი წითელი ლაქა და ოკეანური მთვარეები ულტრა დეტალიზაციით.",
    col_name_saturn: "სატურნი",
    col_desc_saturn: "დიდებული რგოლების სისტემები, ჰექსაგონალური პოლარული მორევები და ყინულოვანი თანამგზავრები.",
    col_name_uranus: "ურანი",
    col_desc_uranus: "ცისფერი ყინულის გიგანტი დახრილი ღერძითა და მანათობელი რგოლებით.",
    col_name_neptune: "ნეპტუნი",
    col_desc_neptune: "მუქი ლურჯი გაზის გიგანტის საოცარი სამყაროები, ზებგერითი ქარები და ტრიტონი.",
    col_name_comets: "კომეტები",
    col_desc_comets: "ღრმა კოსმოსის ყინულის მოგზაურები მზის ქარის ქვეშ მანათობელი აირის კუდებით.",
    col_name_galaxy: "გალაქტიკა",
    col_desc_galaxy: "ეპიკური კოსმოსური სპირალური მკლავები, ბნელი მატერიის ჰალოები და ვარსკვლავური ცენტრები.",
    col_name_stars: "ვარსკვლავები",
    col_desc_stars: "მოციმციმე ვარსკვლავთგროვები, ნეიტრონული ვარსკვლავები და ჰიპერგიგანტები.",
    col_name_nebula: "ნისლეული",
    col_desc_nebula: "იონიზებული გაზის მანათობელი ვარსკვლავთშორისი მტვრის ღრუბლები და ვარსკვლავების სამშობლო.",
    col_name_black_hole: "შავი ხვრელი",
    col_desc_black_hole: "გრავიტაციული ლინზირება, მოვლენათა ჰორიზონტები და რელატივისტური პლაზმური ჭავლები.",
    col_name_meteor_shower: "მეტეორული წვიმა",
    col_desc_meteor_shower: "ატმოსფერული ცეცხლოვანი ზოლები, მტვრის რადიაციული ნაკადები და იონიზებული გაზის კვალები.",
    col_name_space_exploration: "კოსმოსის კვლევა",
    col_desc_space_exploration: "კოლოსალური ვარსკვლავთმფრინავები, ორბიტალური კავშირები და კოლონიზატორების ფლოტები.",
    col_name_astronaut: "ასტრონავტი",
    col_desc_astronaut: "გაბედული მკვლევრები, ღია კოსმოსში გასვლა და მთვარის ნაბიჯები.",
    col_name_satellite: "თანამგზავრი",
    col_desc_satellite: "ლაზერული საკომუნიკაციო მასივები, ჰაბლის ტელესკოპები და საერთაშორისო კოსმოსური სადგურის ხედები.",
    col_name_earth_from_space: "დედამიწა კოსმოსიდან",
    col_desc_earth_from_space: "დედამიწის ორბიტალური რკალის საოცარი ფართო ხედები, თხელი ატმოსფერული ლურჯი ხაზები.",
    col_name_full_moon: "სავსე მთვარე",
    col_desc_full_moon: "იდუმალებით მოცული და სრულად განათებული ვერცხლისფერი დისკები მაღალი კონტრასტით.",
    col_name_moon_phases: "მთვარის ფაზები",
    col_desc_moon_phases: "მთვარის კლებადი, მზარდი, ნახევარი და ნამგალა ფაზები ექსტრემალური კოსმოსური სიღრმით.",
    col_name_cosmic_lights: "კოსმოსური ნათება",
    col_desc_cosmic_lights: "ჰოლოგრაფიული სივრცე-დროის სხივები, გამა-აფეთქებები და პულსარების გამოსხივება.",
    col_name_aurora: "ავრორა",
    col_desc_aurora: "გეომაგნიტური ციური მოცეკვავეები, მზის ნაწილაკების ზურმუხტისფერი და იისფერი ლენტები.",
    col_name_deep_space: "ღრმა კოსმოსი",
    col_desc_deep_space: "ჰაბლისა და ჯეიმს ვების ულტრა-ღრმა ველის კადრები პირველყოფილი დროიდან.",
    col_name_milky_way: "ირმის ნახტომი",
    col_desc_milky_way: "ჩვენი მშობლიური გალაქტიკის ცენტრალური ზოლი, მტვრის ბილიკები და მშვილდოსანი A*.",
    col_name_planetary_system: "პლანეტარული სისტემა",
    col_desc_planetary_system: "ორბიტალური მასივები, მრავალპლანეტიანი დაბნელებები და პლანეტების განლაგება.",
    col_name_supernova: "ზეახალი ვარსკვლავი",
    col_desc_supernova: "ვარსკვლავური კატაკლიზმები, ძლიერი დარტყმითი ტალღები მტვრის გარსებში.",
    col_name_shooting_stars: "მფრინავი ვარსკვლავები",
    col_desc_shooting_stars: "კოსმოსურ სიცარიელეში გამავალი ვარსკვლავის შუქის მყისიერი, ნაზი ზოლები.",
    col_name_exoplanets: "ეგზოპლანეტები",
    col_desc_exoplanets: "საცხოვრებლად ვარგისი სუპერდედამიწები, ორმაგი მზის კლდოვანი უდაბნოები და ლავის ოკეანეები.",
    col_name_wormhole: "ჭიის ხვრელი",
    col_desc_wormhole: "სივრცე-დროის გამრუდების მეტრიკა, თეორიული აინშტაინ-როზენის ხიდები.",
    col_name_dark_space: "ბნელი კოსმოსი",
    col_desc_dark_space: "სუფთა ბნელი თემები, მინიმალისტური ვარსკვლავები და აბსოლუტური ფუფუნების შავი სიცარიელე."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("app_lang");
    return (stored === "en" || stored === "ka") ? stored : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const t = (key: keyof typeof translations["en"]): string => {
    const d = translations[language] || translations["en"];
    return d[key] || translations["en"][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
