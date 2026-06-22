import { useState } from "react";

const DAILY_PLAN = [
  {
    leg: "Tokyo", icon: "🗼", dates: "2–6 Jul", nights: 4,
    accommodation: "Shinjuku Airbnb · HM8YXW3WHS · Self check-in · Check-in after 16:00 · Checkout by 11:00",
    days: [
      { day: "Day 1", date: "Thu 2 Jul", title: "Arrival", items: [
        { time: "17:40", activity: "Land Narita — JQ9", type: "locked", note: "Ref ETZ49I" },
        { time: "18:00", activity: "Suica setup via iPhone Wallet at Narita", type: "todo" },
        { time: "19:30", activity: "Check in to Shinjuku Airbnb — self check-in via key safe", type: "todo", note: "HM8YXW3WHS · 2 Chome-20 Hyakunincho · Host Yumi +81 80-7657-3699" },
        { time: "20:00", activity: "Dinner near hotel", type: "suggested" },
        { time: "21:30", activity: "Early night — recover from travel", type: "suggested" },
      ]},
      { day: "Day 2", date: "Fri 3 Jul", title: "teamLab + Yanaka + Golden Gai", items: [
        { time: "7:00am", activity: "Fuglen Tokyo or Eight Coffee — Shinjuku area", type: "agreed" },
        { time: "8:30am", activity: "teamLab Borderless — Azabudai Hills, Roppongi", type: "locked", note: "Ref BSR181944 · Non-refundable · ~2.5 hrs" },
        { time: "11:30am", activity: "Train Roppongi to Yanaka (~30 min direct)", type: "agreed" },
        { time: "12:30pm", activity: "Yanaka Ginza — lunch at local street stalls", type: "agreed" },
        { time: "2:00pm", activity: "Yanaka old town wander — laneways, temples, cemetery, cats", type: "agreed" },
        { time: "5:00pm", activity: "Head to Shinjuku — Golden Gai bar hop", type: "agreed" },
        { time: "Evening", activity: "Dinner, explore, drinks — see how the night goes", type: "suggested", note: "Shibuya crossing is locked in for Day 4 daytime" },
      ]},
      { day: "Day 3", date: "Sat 4 Jul", title: "Leaves Coffee + Tsukiji", items: [
        { time: "Morning", activity: "Leaves Coffee Roasters — Asakusa/Kuramae area", type: "agreed" },
        { time: "Mid-morning", activity: "Tsukiji outer market wander", type: "agreed" },
        { time: "Lunch", activity: "Fresh sushi or seafood bowl at Tsukiji", type: "agreed" },
        { time: "Afternoon", activity: "Flexible — Akihabara, Harajuku, Ueno Park or Asakusa temple", type: "suggested" },
        { time: "Evening", activity: "Dinner — area of choice", type: "suggested" },
      ]},
      { day: "Day 4", date: "Sun 5 Jul", title: "Shibuya daytime + go-karts at night", items: [
        { time: "Morning", activity: "Coffee — Fuglen, Eight or Leaves", type: "agreed" },
        { time: "Lunch", activity: "Shibuya or Harajuku area", type: "suggested" },
        { time: "Afternoon", activity: "Shibuya crossing — daytime for Leah's photo", type: "agreed" },
        { time: "Afternoon", activity: "Flexible — explore Harajuku, Ueno or revisit favourite", type: "suggested" },
        { time: "Evening", activity: "Go-karts at night — MariCAR or similar", type: "agreed", note: "Book ahead — evening slots. IDP pickup confirmed NRMA Monday." },
      ]},
      { day: "Day 5", date: "Mon 6 Jul", title: "Depart for Hakone", items: [
        { time: "Morning", activity: "Glitch Cafe — Shinjuku (last Tokyo coffee)", type: "agreed" },
        { time: "8:30am", activity: "Check out Shinjuku Airbnb — bags straight to platform", type: "todo", note: "No coin locker needed — you're not returning to Tokyo" },
        { time: "9:20am", activity: "Romancecar Hakone 71 — Shinjuku to Hakone-Yumoto (1h 35m)", type: "locked", note: "Ref XBZ479551 · Car 4 · Seat 14A (Andrew) + 14B (Leah) · Show confirmation email + Freepass to board" },
      ]},
    ],
  },
  {
    leg: "Hakone", icon: "🏔️", dates: "6–8 Jul", nights: 2,
    accommodation: "Centurion Hakone Bettei · Ref 5191.517.143 · Sukiyaki dinner + breakfast incl · Open-air bath · Tatami floors",
    days: [
      { day: "Day 5 cont.", date: "Mon 6 Jul", title: "Arrive Hakone", items: [
        { time: "10:55am", activity: "Arrive Hakone-Yumoto", type: "locked" },
        { time: "11:30am", activity: "Store bags — Hakone-Yumoto station coin lockers, then explore town", type: "todo", note: "Check-in not until 15:00 · Can also ask ryokan to hold bags on arrival if they allow early drop" },
        { time: "Afternoon", activity: "Hakone Open Air Museum", type: "locked", note: "Covered by Freepass" },
        { time: "15:00", activity: "Check in Centurion Hakone Bettei", type: "locked", note: "Ref 5191.517.143 · Open-air bath in room · Tatami floors · Free cancellation closes 23:59 2 Jul — your departure day, non-refundable from that point" },
        { time: "Dinner", activity: "Sukiyaki dinner at Centurion Hakone Bettei — included", type: "locked" },
        { time: "Night", activity: "Private onsen", type: "suggested" },
      ]},
      { day: "Day 6", date: "Tue 7 Jul", title: "Lake Ashi + Owakudani", items: [
        { time: "Morning", activity: "Breakfast at Centurion Hakone Bettei — included", type: "locked" },
        { time: "Mid-morning", activity: "Lake Ashi cruise", type: "locked", note: "Covered by Freepass" },
        { time: "Afternoon", activity: "Owakudani volcanic valley — black eggs, steam vents", type: "suggested" },
        { time: "Evening", activity: "Head back to ryokan for dinner", type: "suggested" },
        { time: "Dinner", activity: "Sukiyaki dinner at Centurion Hakone Bettei — included", type: "locked" },
        { time: "Night", activity: "Onsen", type: "suggested" },
      ]},
      { day: "Day 7", date: "Wed 8 Jul", title: "Depart for Kyoto", items: [
        { time: "Morning", activity: "Breakfast at Centurion Hakone Bettei — included", type: "locked" },
        { time: "11:00am", activity: "Check out by 11:00", type: "todo" },
        { time: "Late morning", activity: "Local train Hakone-Yumoto to Odawara (~$6, Suica)", type: "todo" },
        { time: "Midday", activity: "Shinkansen Hikari Odawara to Kyoto (~$234 for two, buy at station)", type: "todo" },
      ]},
    ],
  },
  {
    leg: "Kyoto", icon: "⛩️", dates: "8–10 Jul", nights: 2,
    accommodation: "TBC — 2 nights needed",
    days: [
      { day: "Day 7 cont.", date: "Wed 8 Jul", title: "Arrive Kyoto", items: [
        { time: "Afternoon", activity: "Arrive Kyoto — check in", type: "todo" },
        { time: "Late afternoon", activity: "Gion at dusk — geisha district wander", type: "suggested" },
        { time: "Evening", activity: "Dinner in Gion area", type: "suggested" },
      ]},
      { day: "Day 8", date: "Thu 9 Jul", title: "Fushimi Inari + Arashiyama", items: [
        { time: "5:00am", activity: "Fushimi Inari — before the crowds (gates glow at dawn)", type: "agreed" },
        { time: "8:00am", activity: "Breakfast near Fushimi", type: "suggested" },
        { time: "10:00am", activity: "Arashiyama bamboo grove", type: "suggested" },
        { time: "Lunch", activity: "Arashiyama area", type: "suggested" },
        { time: "Afternoon", activity: "Philosopher's Path", type: "suggested" },
        { time: "Evening", activity: "Nishiki Market", type: "suggested" },
      ]},
      { day: "Day 9", date: "Fri 10 Jul", title: "Depart for Hiroshima", items: [
        { time: "Morning", activity: "Check out Kyoto accommodation", type: "todo" },
        { time: "Late morning", activity: "Shinkansen Kyoto to Hiroshima (~$214 for two, buy at station)", type: "todo" },
      ]},
    ],
  },
  {
    leg: "Hiroshima", icon: "🕊️", dates: "10–12 Jul", nights: 2,
    accommodation: "TBC — 2 nights needed",
    days: [
      { day: "Day 9 cont.", date: "Fri 10 Jul", title: "Arrive Hiroshima", items: [
        { time: "Afternoon", activity: "Arrive Hiroshima — check in", type: "todo" },
        { time: "Late afternoon", activity: "Peace Memorial Park — first visit at dusk", type: "suggested" },
        { time: "Evening", activity: "Oysters for dinner — Hiroshima specialty", type: "agreed" },
      ]},
      { day: "Day 10", date: "Sat 11 Jul", title: "Peace Museum + Miyajima", items: [
        { time: "Morning", activity: "Peace Memorial Museum", type: "locked" },
        { time: "Lunch", activity: "Near museum area", type: "suggested" },
        { time: "Afternoon", activity: "Miyajima Island — floating torii gate, deer", type: "suggested" },
        { time: "Evening", activity: "More oysters", type: "agreed" },
      ]},
      { day: "Day 11", date: "Sun 12 Jul", title: "Depart for Osaka", items: [
        { time: "Morning", activity: "Check out Hiroshima", type: "todo" },
        { time: "Late morning", activity: "Shinkansen Hiroshima to Shin-Osaka (~$197 for two, buy at station)", type: "todo" },
      ]},
    ],
  },
  {
    leg: "Osaka", icon: "🏙️", dates: "12–14 Jul", nights: 2,
    accommodation: "TBC — 2 nights needed",
    days: [
      { day: "Day 11 cont.", date: "Sun 12 Jul", title: "Arrive Osaka", items: [
        { time: "Afternoon", activity: "Arrive Osaka — check in", type: "todo" },
        { time: "Evening", activity: "Dotonbori — neon, canal, street food", type: "suggested" },
        { time: "Night", activity: "Kuromon Market, takoyaki, okonomiyaki", type: "suggested" },
      ]},
      { day: "Day 12", date: "Mon 13 Jul", title: "Osaka full day", items: [
        { time: "Morning", activity: "Osaka Castle — arrive early to beat crowds", type: "suggested" },
        { time: "Lunch", activity: "Shinsekai — retro neighbourhood, kushikatsu", type: "suggested" },
        { time: "Afternoon", activity: "Namba, Amerika-Mura or Hozenji Yokocho laneway", type: "suggested" },
        { time: "Evening", activity: "Final Japan dinner — back to Dotonbori or explore", type: "suggested" },
      ]},
      { day: "Day 13", date: "Tue 14 Jul", title: "Depart Osaka to Philippines", items: [
        { time: "Morning", activity: "Check out Osaka accommodation", type: "todo" },
        { time: "Afternoon", activity: "Head to KIX Airport — Haruka Express from Namba ~75 mins", type: "todo", note: "~$30 Suica or buy Haruka ticket" },
        { time: "22:25", activity: "Fly KIX to MNL — GK81 Jetstar Japan", type: "locked", note: "Ref EN62XK · Arrive MNL 01:50" },
      ]},
    ],
  },
  {
    leg: "Boracay", icon: "🏖️", dates: "15–21 Jul", nights: 6,
    accommodation: "Henann Regency Resort & Spa · Ref QA62J4ANR · Station 2 White Beach · Breakfast included",
    days: [
      { day: "Day 14", date: "Wed 15 Jul", title: "Arrive Boracay", items: [
        { time: "7:05am", activity: "Fly MNL to Caticlan — Z2213", type: "locked", note: "Ref BE19VW · Arrive 08:10" },
        { time: "8:30am", activity: "Boat Caticlan to Boracay (~$5, ~10 mins)", type: "suggested", note: "Confirmation printed QA62J4ANR · Pay on arrival" },
        { time: "9:30am", activity: "Arrive White Beach — beach by 9:30am", type: "suggested" },
        { time: "15:00", activity: "Check in Henann Regency — request early check-in", type: "todo" },
        { time: "Evening", activity: "First dinner at resort — 6 restaurants to choose from", type: "suggested" },
      ]},
      { day: "Days 15-20", date: "Thu 16 – Mon 20 Jul", title: "Boracay — 5 full beach days", items: [
        { time: "Daily", activity: "Breakfast buffet included at Henann Regency", type: "locked" },
        { time: "All day", activity: "White Beach Station 2, 3 pools, watersports", type: "suggested" },
        { time: "All day", activity: "Henann group access — all properties incl Station 1 beachfront", type: "suggested" },
      ]},
      { day: "Day 21", date: "Tue 21 Jul", title: "Depart Boracay", items: [
        { time: "12:00", activity: "Check out Henann Regency", type: "todo" },
        { time: "15:45", activity: "Fly Caticlan to MNL — Z2224", type: "locked", note: "Ref BE19VW · Arrive MNL 16:50" },
        { time: "17:30", activity: "Check in Belmont Hotel Manila", type: "todo", note: "Ref QA39ZC2AJ · Check-in from 14:00 · Watch for check-in email 24hrs prior · Check-in location: Meeting Room" },
        { time: "Evening", activity: "Dinner near Belmont / Terminal 3 area", type: "suggested" },
      ]},
    ],
  },
  {
    leg: "Manila Home", icon: "✈️", dates: "22–23 Jul", nights: 0,
    accommodation: "Belmont Hotel Manila · Ref QA39ZC2AJ · Terminal 3 adjacent · Breakfast included",
    days: [
      { day: "Day 22", date: "Wed 22 Jul", title: "Fly home", items: [
        { time: "Morning", activity: "Breakfast at Belmont Hotel — included", type: "locked" },
        { time: "12:00", activity: "Check out Belmont Hotel", type: "todo" },
        { time: "Afternoon", activity: "Terminal 3 — check in for PR211, airport time", type: "todo" },
        { time: "21:35", activity: "Fly MNL to SYD — PR211 Philippine Airlines", type: "locked", note: "Ref DIB090 · Arrive SYD 08:00 Thu 23 Jul" },
      ]},
    ],
  },
];

const TRIP_DATA = {
  meta: { dates: "2 Jul to 23 Jul 2026", travellers: "Andrew Percival & Leah Tredway", qff: "2013874546" },
  bookings: [
    { ref: "ETZ49I", date: "2 Jul", detail: "SYD to BNE to TYO (JQ810 + JQ9 Jetstar)", cost: "$387 + 62k pts", status: "locked" },
    { ref: "EN62XK", date: "14 Jul 22:25", detail: "KIX to MNL (GK81 Jetstar Japan)", cost: "Cash", status: "locked" },
    { ref: "BE19VW", date: "15 Jul 07:05", detail: "MNL to Caticlan (Z2213 AirAsia)", cost: "$439 total", status: "locked" },
    { ref: "BE19VW", date: "21 Jul 15:45", detail: "Caticlan to MNL (Z2224 AirAsia)", cost: "Included", status: "locked" },
    { ref: "DIB090", date: "22 Jul 21:35", detail: "MNL to SYD (PR211 Philippine Airlines)", cost: "80k pts", status: "locked" },
    { ref: "HM8YXW3WHS", date: "2-6 Jul", detail: "Tokyo Airbnb — Shinjuku 4 nights · Host Yumi · Self check-in", cost: "$572.97", status: "locked" },
    { ref: "5191.517.143", date: "6-8 Jul", detail: "Centurion Hakone Bettei — 2 nights · Sukiyaki dinner + breakfast · Open-air bath", cost: "~$996", status: "locked" },
    { ref: "QA62J4ANR", date: "15-21 Jul", detail: "Henann Regency Boracay — 6 nights · Superior Room · Breakfast incl", cost: "94,807 pts", status: "locked" },
    { ref: "QA39ZC2AJ", date: "21-22 Jul", detail: "Belmont Hotel Manila — 1 night · Standard Queen · Breakfast incl", cost: "$151.05", status: "locked" },
    { ref: "RS-CTM1005685", date: "2-23 Jul", detail: "ReadySet Travel Insurance — Premium Single Trip (Andrew + Leah)", cost: "$155.68", status: "locked" },
    { ref: "BSR181944", date: "3 Jul 08:30", detail: "teamLab Borderless — Azabudai Hills, Roppongi (2 adults)", cost: "$88.70", status: "locked" },
    { ref: "XBZ479551", date: "6 Jul 09:20", detail: "Romancecar Hakone 71 — Shinjuku to Hakone-Yumoto · Car 4 · Seat 14A + 14B", cost: "AUD $22.96", status: "locked" },
    { ref: "ZPS305093", date: "6-8 Jul", detail: "Digital Hakone Freepass 2-day (2 adults) — PAID · Share Adult 2 pass to Leah", cost: "~$126.60", status: "locked" },
    { ref: "TBC", date: "8-10 Jul", detail: "Kyoto accommodation — 2 nights", cost: "~$280-360", status: "tbc" },
    { ref: "TBC", date: "10-12 Jul", detail: "Hiroshima accommodation — 2 nights", cost: "~$250-350", status: "tbc" },
    { ref: "TBC", date: "12-14 Jul", detail: "Osaka accommodation — 2 nights", cost: "~$250-350", status: "tbc" },
  ],
  todos: [
    { item: "Share Hakone Freepass Adult 2 pass to Leah", urgency: "urgent", when: "TODAY", cost: "—", notes: "Freepass ref ZPS305093 · Open Klook > tap Share pass for Adult 2 · Leah activates on her own device before 6 Jul." },
    { item: "Kyoto accommodation (8-10 Jul)", urgency: "urgent", when: "This week", cost: "~$280-360", notes: "2 nights. July peak season — Gion fills fast. Gion / Higashiyama area recommended." },
    { item: "Hiroshima accommodation (10-12 Jul)", urgency: "urgent", when: "This week", cost: "~$250-350", notes: "2 nights. Walking distance to Peace Park strongly recommended." },
    { item: "Osaka accommodation (12-14 Jul)", urgency: "urgent", when: "This week", cost: "~$250-350", notes: "2 nights. Dotonbori / Namba area. Late checkout useful — KIX flight not until 22:25." },
    { item: "Book Tokyo go-karts", urgency: "high", when: "Before departure", cost: "TBC", notes: "MariCAR or similar. Sunday evening slots fill fast. IDP confirmed — pickup NRMA Monday 29 Jun." },
    { item: "Contact Henann re: bed type", urgency: "high", when: "This week", cost: "—", notes: "Booking shows 2 Twin Beds. Request double/queen. Ph: +63-362886111. Ref QA62J4ANR." },
    { item: "Kathmandu — Flight pants x2", urgency: "high", when: "Before departure", cost: "~$150-200", notes: "Replace jeans. Check rain shells too." },
    { item: "Aldi — Merino tops + underwear", urgency: "high", when: "Before departure", cost: "~$80-100", notes: "3-4 merino tees each + merino boxers. Stock confirmed in store. Sizing runs small." },
    { item: "Email Henann re: early check-in", urgency: "medium", when: "1-2 weeks before 15 Jul", cost: "—", notes: "Arriving ~9am 15 Jul, check-in from 15:00. Ref QA62J4ANR." },
    { item: "Japan SIM / eSIM", urgency: "low", when: "At Narita on arrival", cost: "~$0-50", notes: "2x free eSIMs already from Klook bookings — check these first. Buy backup SIM at Narita only if needed." },
    { item: "Suica setup", urgency: "low", when: "At Narita on arrival", cost: "Load 5,000 yen", notes: "Set up via iPhone Wallet at Narita airport." },
    { item: "Wear in Hoka Clifton 10s", urgency: "low", when: "Before 2 Jul", cost: "—", notes: "Don't arrive in Japan with new shoes. Wear them now." },
  ],
  gear: [
    { item: "2x Anker PowerBank 20,000mAh", status: "done", cost: "~$139", notes: "Arrived" },
    { item: "ReadySet Travel Insurance — Premium", status: "done", cost: "$155.68", notes: "Policy RS-CTM1005685 · Both names · Japan + Philippines · 2-23 Jul" },
    { item: "teamLab Borderless tickets", status: "done", cost: "$88.70", notes: "BSR181944 · 3 Jul 08:30 · Azabudai Hills · Mobile voucher · Non-refundable" },
    { item: "Patagonia Black Hole Pack 25L — Black", status: "done", cost: "$186.62", notes: "Rushfaster EOFY · #WQ5NV2H85 · Express shipping · Arrives before 2 Jul" },
    { item: "Hoka Clifton 10 (Andrew) — Size 9.5", status: "done", cost: "~$220", notes: "Rebel Sport Maitland · Wear in before 2 Jul" },
    { item: "Leah's NB 1080s", status: "done", cost: "Owned", notes: "Confirmed suitable — no replacement needed" },
    { item: "Digital Hakone Freepass 2-day", status: "done", cost: "~$127", notes: "ZPS305093 PAID · Share Adult 2 pass to Leah before 6 Jul — each person activates on own device" },
    { item: "Romancecar Hakone 71", status: "done", cost: "AUD $22.96", notes: "XBZ479551 PAID · Car 4 · Seat 14A (Andrew) + 14B (Leah) · Show confirmation email + Freepass to board" },
    { item: "Kathmandu Flight pants x2", status: "todo", cost: "~$150-200", notes: "Still to purchase. Check rain shells too." },
    { item: "Aldi Merino tops + underwear", status: "todo", cost: "~$80-100", notes: "3-4 tees each + boxers. Stock confirmed. Sizing runs small." },
    { item: "IDP — International Driving Permit", status: "tomorrow", cost: "~$35", notes: "NRMA in person Monday 29 Jun. Required for go-karts Tokyo." },
    { item: "Japan SIM / eSIM", status: "todo", cost: "~$0-50", notes: "Check 2x free Klook eSIMs first. Buy at Narita if needed." },
  ],
  transport: [
    { leg: "Tokyo local", how: "Suica card (iPhone Wallet)", cost: "Pay as you go", book: "Set up at Narita", status: "onarrival" },
    { leg: "Tokyo to Hakone", how: "Romancecar Hakone 71 · 09:20 · Car 4 · 14A+14B", cost: "AUD $22.96", book: "PAID ref XBZ479551", status: "onarrival" },
    { leg: "Hakone local", how: "Digital Hakone Freepass 2-day", cost: "~$127", book: "PAID ref ZPS305093", status: "onarrival" },
    { leg: "Hakone-Yumoto to Odawara", how: "Local train", cost: "~$6", book: "Suica", status: "onarrival" },
    { leg: "Odawara to Kyoto", how: "Shinkansen Hikari", cost: "~$234 (two)", book: "Buy at station · 8 Jul", status: "onarrival" },
    { leg: "Kyoto to Hiroshima", how: "Shinkansen", cost: "~$214 (two)", book: "Buy at station · 10 Jul", status: "onarrival" },
    { leg: "Hiroshima to Shin-Osaka", how: "Shinkansen", cost: "~$197 (two)", book: "Buy at station · 12 Jul", status: "onarrival" },
    { leg: "Osaka local", how: "Suica", cost: "Pay as you go", book: "—", status: "onarrival" },
    { leg: "Osaka Namba to KIX", how: "Haruka Express (~75 mins)", cost: "~$30", book: "Suica · 14 Jul", status: "onarrival" },
  ],
  budget: [
    { item: "Flights (paid)", cost: "$826", status: "paid" },
    { item: "Travel Insurance (paid)", cost: "$155.68", status: "paid" },
    { item: "teamLab Borderless (paid)", cost: "$88.70", status: "paid" },
    { item: "Patagonia Backpack (paid)", cost: "$186.62", status: "paid" },
    { item: "Hoka Clifton 10 (paid)", cost: "~$220", status: "paid" },
    { item: "Tokyo Airbnb — 4 nights (paid)", cost: "$572.97", status: "paid" },
    { item: "Centurion Hakone Bettei — 2 nights (paid)", cost: "~$996", status: "paid" },
    { item: "Belmont Hotel Manila (paid)", cost: "$151.05", status: "paid" },
    { item: "Digital Hakone Freepass (paid)", cost: "~$127", status: "paid" },
    { item: "Romancecar Hakone 71 (paid)", cost: "AUD $22.96", status: "paid" },
    { item: "Kathmandu + Aldi clothing", cost: "~$300", status: "todo" },
    { item: "IDP — NRMA", cost: "~$35", status: "todo" },
    { item: "Kyoto accommodation (2 nights)", cost: "~$280-360", status: "est" },
    { item: "Hiroshima accommodation (2 nights)", cost: "~$250-350", status: "est" },
    { item: "Osaka accommodation (2 nights)", cost: "~$250-350", status: "est" },
    { item: "Japan transport (remaining — Shinkansen legs + Suica)", cost: "~$500", status: "est" },
    { item: "Japan food ~$60/day x 13", cost: "~$780", status: "est" },
    { item: "Philippines food ~$30/day x 7", cost: "~$210", status: "est" },
    { item: "Activities / entrance fees", cost: "~$300", status: "est" },
    { item: "Misc / contingency", cost: "~$300", status: "est" },
  ],
};

const STATUS_CFG = {
  locked:       { label: "Locked In",      color: "#15803d", bg: "#dcfce7", dot: "#16a34a" },
  paytomorrow:  { label: "Pay Today",      color: "#7c3aed", bg: "#ede9fe", dot: "#8b5cf6" },
  suggested:    { label: "Suggested",      color: "#64748b", bg: "#f1f5f9", dot: "#94a3b8" },
  onarrival:    { label: "On Arrival",     color: "#0369a1", bg: "#e0f2fe", dot: "#0ea5e9" },
  buyatstation: { label: "Buy at Station", color: "#b45309", bg: "#fef3c7", dot: "#d97706" },
  tbc:          { label: "To Book",        color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
};

const ACT_CFG = {
  locked:    { color: "#15803d", bg: "#dcfce7", dot: "#16a34a", label: "Locked In" },
  agreed:    { color: "#0369a1", bg: "#dbeafe", dot: "#3b82f6", label: "Agreed" },
  suggested: { color: "#64748b", bg: "#f1f5f9", dot: "#94a3b8", label: "Suggested" },
  todo:      { color: "#b45309", bg: "#fef3c7", dot: "#d97706", label: "To Action" },
};

const uC = { urgent: "#ef4444", high: "#f97316", medium: "#eab308", low: "#22c55e" };
const uB = { urgent: "#fef2f2", high: "#fff7ed", medium: "#fefce8", low: "#f0fdf4" };

const Badge = ({ text, color, bg }) => (
  <span style={{ background: bg, color, borderRadius: 4, padding: "2px 6px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>{text}</span>
);

function DayCard({ d }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 8 }}>
      <div onClick={() => setOpen(o => !o)} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: open ? "8px 8px 0 0" : 8, padding: "9px 12px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>{d.day}</span>
            <span style={{ fontSize: 12, color: "#64748b", marginLeft: 8 }}>{d.date}</span>
            <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>— {d.title}</span>
          </div>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ border: "1px solid #e2e8f0", borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
          {d.items.map((item, i) => {
            const c = ACT_CFG[item.type] || ACT_CFG.suggested;
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 12px", background: i % 2 === 0 ? "#fff" : "#fafafa", borderTop: i > 0 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, flexShrink: 0, marginTop: 5 }} />
                <div style={{ width: 70, flexShrink: 0 }}><span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{item.time}</span></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 12, color: "#1e293b" }}>{item.activity}</span>
                  {item.note && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{item.note}</div>}
                </div>
                <Badge text={c.label} color={c.color} bg={c.bg} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LegCard({ leg }) {
  const [open, setOpen] = useState(false);
  const lc = { "🗼": "#e11d48", "🏔️": "#0369a1", "⛩️": "#7c3aed", "🕊️": "#475569", "🏙️": "#f97316", "🏖️": "#d97706", "✈️": "#6366f1" };
  const accent = lc[leg.icon] || "#64748b";
  const isTbc = leg.accommodation.startsWith("TBC");
  return (
    <div style={{ marginBottom: 12 }}>
      <div onClick={() => setOpen(o => !o)} style={{ background: "#fff", border: `2px solid ${accent}22`, borderLeft: `4px solid ${accent}`, borderRadius: open ? "8px 8px 0 0" : 8, padding: "11px 14px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>{leg.icon}</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: accent }}>{leg.leg}</span>
                {leg.nights > 0 && <span style={{ fontSize: 11, color: "#94a3b8" }}>{leg.nights} nights</span>}
                {isTbc && <Badge text="No hotel" color="#dc2626" bg="#fee2e2" />}
              </div>
              <div style={{ fontSize: 11, color: isTbc ? "#dc2626" : "#64748b", marginTop: 2 }}>{leg.accommodation}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#64748b" }}>{leg.dates}</span>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>{open ? "▲" : "▼"}</span>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ border: "2px solid #e2e8f0", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "12px", background: "#fafafa" }}>
          {leg.days.map((day, i) => <DayCard key={i} d={day} />)}
        </div>
      )}
    </div>
  );
}

const TabBtn = ({ id, label, active, onClick, alert }) => (
  <button onClick={() => onClick(id)} style={{ padding: "7px 13px", border: "none", borderBottom: active ? "3px solid #e11d48" : "3px solid transparent", background: "none", cursor: "pointer", fontWeight: active ? 700 : 400, color: active ? "#e11d48" : "#64748b", fontSize: 12, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
  {label}
  {alert && !active && <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 5px" }}>{alert}</span>}
</button>
);

export default function TripDashboard() {
  const [tab, setTab] = useState("dailyplan");
  const urgentCount = TRIP_DATA.todos.filter(t => t.urgency === "urgent").length;

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 700, margin: "0 auto", padding: "0 0 40px" }}>
      <div style={{ background: "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)", borderRadius: 12, padding: "18px 20px", marginBottom: 16, color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>Japan + Philippines 2026</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 3 }}>Andrew & Leah · 2 Jul – 23 Jul · 21 nights · QFF 2013874546</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Departs in</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>10 days</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          {[
            { label: "Flights", val: "5 booked", ok: true },
            { label: "Hakone", val: "Confirmed", ok: true },
            { label: "Hotels", val: "3 unbooked", ok: false },
            { label: "Klook", val: "All paid", ok: true },
          ].map(s => (
            <div key={s.label} style={{ background: s.ok ? "rgba(255,255,255,0.15)" : "rgba(255,200,0,0.25)", borderRadius: 8, padding: "6px 12px", fontSize: 11 }}>
              <div style={{ opacity: 0.75, fontSize: 10 }}>{s.label}</div>
              <div style={{ fontWeight: 700 }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "2px solid #f1f5f9", overflowX: "auto", marginBottom: 16 }}>
        {[
          { id: "dailyplan", label: "Daily Plan" },
          { id: "bookings", label: "Bookings" },
          { id: "todos", label: "To-do", alert: urgentCount },
          { id: "transport", label: "Transport" },
          { id: "gear", label: "Gear" },
          { id: "budget", label: "Budget" },
        ].map(t => <TabBtn key={t.id} {...t} active={tab === t.id} onClick={setTab} />)}
      </div>

      <div style={{ padding: "0 2px" }}>
        {tab === "dailyplan" && (
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12 }}>Click a leg to expand · Click a day to see the full schedule</div>
            {DAILY_PLAN.map((leg, i) => <LegCard key={i} leg={leg} />)}
          </div>
        )}

        {tab === "bookings" && (
          <div>
            {TRIP_DATA.bookings.map((b, i) => {
              const c = STATUS_CFG[b.status] || STATUS_CFG.suggested;
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: i < TRIP_DATA.bookings.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot, flexShrink: 0, marginTop: 5 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: "#1e293b" }}>{b.detail}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{b.date}</div>
                    {b.ref !== "TBC" && !b.ref.includes("PENDING") && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1, fontFamily: "monospace" }}>REF: {b.ref}</div>}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: c.color }}>{b.cost}</div>
                    <div style={{ marginTop: 3 }}><Badge text={c.label} color={c.color} bg={c.bg} /></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "todos" && (
          <div>
            {["urgent","high","medium","low"].map(level => {
              const items = TRIP_DATA.todos.filter(t => t.urgency === level);
              if (!items.length) return null;
              const emoji = { urgent: "🚨", high: "🔴", medium: "🟡", low: "🟢" }[level];
              return (
                <div key={level} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: uC[level], marginBottom: 6 }}>{emoji} {level}</div>
                  {items.map((t, i) => (
                    <div key={i} style={{ background: uB[level], border: `1px solid ${uC[level]}33`, borderRadius: 8, padding: "8px 11px", marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 3 }}>
                        <span style={{ fontWeight: 600, fontSize: 12, color: "#1e293b" }}>{t.item}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>{t.cost}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>{t.notes}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>When: {t.when}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {tab === "transport" && (
          <div>
            <div style={{ background: "#fef9c3", border: "1px solid #fde047", borderRadius: 8, padding: "8px 11px", marginBottom: 12, fontSize: 11, color: "#713f12" }}>
              <strong>JR Pass: do not buy.</strong> Individual Shinkansen tickets ~$645 vs $934 for two 7-day passes. Saving ~$289.
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead><tr style={{ background: "#f8fafc" }}>
                  {["Leg","How","Cost (two)","Book where"].map(h => <th key={h} style={{ padding: "6px 9px", textAlign: "left", fontWeight: 600, color: "#475569", borderBottom: "2px solid #e2e8f0" }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {TRIP_DATA.transport.map((t, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "6px 9px", fontWeight: 600, color: "#1e293b" }}>{t.leg}</td>
                      <td style={{ padding: "6px 9px", color: "#475569" }}>{t.how}</td>
                      <td style={{ padding: "6px 9px", color: "#16a34a", fontWeight: 600 }}>{t.cost}</td>
                      <td style={{ padding: "6px 9px", color: "#64748b" }}>{t.book}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "#f0fdf4", borderTop: "2px solid #86efac" }}>
                    <td colSpan={2} style={{ padding: "6px 9px", fontWeight: 700, color: "#166534" }}>TOTAL Japan Transport (est.)</td>
                    <td style={{ padding: "6px 9px", fontWeight: 700, color: "#166534" }}>~$857 for two</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "gear" && (
          <div>
            {TRIP_DATA.gear.map((g, i) => {
              const icon = g.status === "done" ? "✅" : g.status === "tomorrow" ? "💳" : "⬜";
              const bg = g.status === "done" ? "#f0fdf4" : g.status === "tomorrow" ? "#f5f3ff" : "#f8fafc";
              const bdr = g.status === "done" ? "1px solid #86efac" : g.status === "tomorrow" ? "1px solid #c4b5fd" : "1px solid #e2e8f0";
              const cc = g.status === "done" ? "#16a34a" : g.status === "tomorrow" ? "#7c3aed" : "#475569";
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 11px", borderRadius: 8, background: bg, marginBottom: 6, border: bdr }}>
                  <span style={{ fontSize: 16, marginTop: 1 }}>{icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: "#1e293b" }}>{g.item}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{g.notes}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: cc, flexShrink: 0 }}>{g.cost}</div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "budget" && (
          <div>
            {TRIP_DATA.budget.map((b, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < TRIP_DATA.budget.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ fontSize: 12, color: "#1e293b" }}>{b.item}</span>
                  {b.status === "paid" && <Badge text="Paid" color="#15803d" bg="#dcfce7" />}
                  {b.status === "tomorrow" && <Badge text="Pay today" color="#7c3aed" bg="#ede9fe" />}
                  {b.status === "todo" && <Badge text="To buy" color="#b45309" bg="#fef3c7" />}
                  {b.status === "est" && <Badge text="Est." color="#64748b" bg="#f1f5f9" />}
                </div>
                <span style={{ fontWeight: 600, fontSize: 12, color: b.status === "paid" ? "#16a34a" : b.status === "tomorrow" ? "#7c3aed" : "#1e293b", flexShrink: 0, marginLeft: 8 }}>{b.cost}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "11px 13px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #86efac" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#166534" }}>Total est. remaining cash outlay</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: "#166534" }}>~$4,200</span>
              </div>
              <div style={{ fontSize: 11, color: "#166534", marginTop: 4 }}>Cash available: $2-3k + $5k credit card backup = $7-8k total · <strong>Comfortably covered</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
