import { FALLBACK_LOCALE, type Locale } from './locales'

// UI chrome strings (nav, headings, buttons) in all four languages. en + hi are the
// source pair; pa/bgc are provided for these short labels and fall back to hi if absent.
// Lesson BODY content still uses the per-lesson i18n + honest badges — this is only chrome.
type Entry = Partial<Record<Locale, string>> & { en: string }

const UI: Record<string, Entry> = {
  'nav.learn': { en: 'Learn', hi: 'सीखो', pa: 'ਸਿੱਖੋ', bgc: 'सीखो' },
  'nav.tools': { en: 'Tools', hi: 'औज़ार', pa: 'ਔਜ਼ਾਰ', bgc: 'औजार' },
  'nav.build': { en: 'Build', hi: 'बनाओ', pa: 'ਬਣਾਓ', bgc: 'बणाओ' },
  'nav.fix': { en: 'Fix It', hi: 'ठीक करो', pa: 'ਠੀਕ ਕਰੋ', bgc: 'ठीक करो' },
  'nav.me': { en: 'Me', hi: 'मैं', pa: 'ਮੈਂ', bgc: 'मैं' },

  'disc.tools': { en: 'Tools', hi: 'औज़ार', pa: 'ਔਜ਼ਾਰ', bgc: 'औजार' },
  'disc.woods': { en: 'Woods', hi: 'लकड़ी', pa: 'ਲੱਕੜ', bgc: 'लकड़ी' },
  'disc.glossary': { en: 'Glossary', hi: 'शब्दकोश', pa: 'ਸ਼ਬਦਕੋਸ਼', bgc: 'शब्दकोश' },

  'home.continue': { en: 'Continue', hi: 'जारी रखो', pa: 'ਜਾਰੀ ਰੱਖੋ', bgc: 'जारी राखो' },
  'home.resume': { en: '▶ Resume', hi: '▶ फिर शुरू', pa: '▶ ਫਿਰ ਸ਼ੁਰੂ', bgc: '▶ फेर शुरू' },
  'home.startHereK': { en: 'Start here', hi: 'यहाँ से शुरू', pa: 'ਇੱਥੋਂ ਸ਼ੁਰੂ', bgc: 'उड़ै तै शुरू' },
  'home.start': { en: '▶ Start', hi: '▶ शुरू', pa: '▶ ਸ਼ੁਰੂ', bgc: '▶ शुरू' },
  'home.path': { en: 'The path', hi: 'रास्ता', pa: 'ਰਾਹ', bgc: 'रास्ता' },
  'home.jumpIn': { en: 'Jump in', hi: 'सीधे जाओ', pa: 'ਸਿੱਧੇ ਜਾਓ', bgc: 'सीधा जाओ' },
  'home.dayStreak': { en: 'day streak', hi: 'दिन की लगन', pa: 'ਦਿਨ ਦੀ ਲਗਨ', bgc: 'दिन की लगन' },

  'lesson.objectives': { en: 'You’ll be able to', hi: 'आप कर पाएँगे', pa: 'ਤੁਸੀਂ ਕਰ ਸਕੋਗੇ', bgc: 'थम कर पाओगे' },
  'lesson.steps': { en: 'Steps', hi: 'चरण', pa: 'ਪੜਾਅ', bgc: 'चरण' },
  'lesson.practice': { en: 'Practice', hi: 'अभ्यास', pa: 'ਅਭਿਆਸ', bgc: 'अभ्यास' },
  'lesson.selfCheck': { en: 'Self-check', hi: 'खुद जाँचें', pa: 'ਖ਼ੁਦ ਜਾਂਚੋ', bgc: 'खुद जाँचो' },
  'lesson.safety': { en: 'Safety', hi: 'सुरक्षा', pa: 'ਸੁਰੱਖਿਆ', bgc: 'सुरक्षा' },
  'lesson.markComplete': { en: '✓ Mark complete', hi: '✓ पूरा हुआ चिह्नित करें', pa: '✓ ਪੂਰਾ ਹੋਇਆ ਨਿਸ਼ਾਨ ਲਾਓ', bgc: '✓ पूरा होया चिन्हित करो' },
  'lesson.marked': { en: '✓ Marked complete', hi: '✓ पूरा हुआ', pa: '✓ ਪੂਰਾ ਹੋਇਆ', bgc: '✓ पूरा होया' },
  'lesson.recommendedFirst': { en: 'Recommended first:', hi: 'पहले सुझाया:', pa: 'ਪਹਿਲਾਂ ਸੁਝਾਇਆ:', bgc: 'पहलम सुझाया:' },
  'lesson.prev': { en: '← Previous', hi: '← पिछला', pa: '← ਪਿਛਲਾ', bgc: '← पिछला' },
  'lesson.next': { en: 'Next →', hi: 'अगला →', pa: 'ਅਗਲਾ →', bgc: 'अगला →' },
  'lesson.done': { en: 'Done →', hi: 'हो गया →', pa: 'ਹੋ ਗਿਆ →', bgc: 'हो ग्या →' },
  'lesson.backTo': { en: 'Back to', hi: 'वापस', pa: 'ਵਾਪਸ', bgc: 'वापस' },
  'lesson.word': { en: 'Lesson', hi: 'पाठ', pa: 'ਪਾਠ', bgc: 'पाठ' },
  'lesson.reviewNote': {
    en: '⚠ Safety content — awaiting expert review. Learn alongside an experienced mistri or a certified course; don’t rely on this alone.',
    hi: '⚠ सुरक्षा सामग्री — विशेषज्ञ जाँच बाकी। अनुभवी मिस्त्री या प्रमाणित कोर्स के साथ सीखें; अकेले इस पर निर्भर न रहें।',
    pa: '⚠ ਸੁਰੱਖਿਆ ਸਮੱਗਰੀ — ਮਾਹਰ ਜਾਂਚ ਬਾਕੀ। ਤਜਰਬੇਕਾਰ ਮਿਸਤਰੀ ਜਾਂ ਪ੍ਰਮਾਣਿਤ ਕੋਰਸ ਨਾਲ ਸਿੱਖੋ; ਇਕੱਲੇ ਇਸ ਤੇ ਨਿਰਭਰ ਨਾ ਰਹੋ।',
    bgc: '⚠ सुरक्षा सामग्री — माहिर जाँच बाकी। तजुर्बेकार मिस्त्री या प्रमाणित कोर्स कै गेल्यां सीखो; अकेले इस पै मत टिको।',
  },

  'lesson.source': { en: 'Source:', hi: 'स्रोत:', pa: 'ਸਰੋਤ:', bgc: 'सोत्तर:' },
  'lesson.needsReview': { en: 'needs expert review', hi: 'विशेषज्ञ जाँच बाकी', pa: 'ਮਾਹਰ ਜਾਂਚ ਬਾਕੀ', bgc: 'माहिर जाँच बाकी' },

  'diff.beginner': { en: 'beginner', hi: 'शुरुआती', pa: 'ਸ਼ੁਰੂਆਤੀ', bgc: 'शुरुआती' },
  'diff.intermediate': { en: 'intermediate', hi: 'मध्यम', pa: 'ਦਰਮਿਆਨਾ', bgc: 'मध्यम' },
  'diff.advanced': { en: 'advanced', hi: 'उन्नत', pa: 'ਉੱਨਤ', bgc: 'उन्नत' },

  'crumb.home': { en: '← Home', hi: '← होम', pa: '← ਹੋਮ', bgc: '← होम' },
  'level.lessons': { en: 'lessons', hi: 'पाठ', pa: 'ਪਾਠ', bgc: 'पाठ' },

  'video.play': { en: 'Play video', hi: 'वीडियो चलाओ', pa: 'ਵੀਡੀਓ ਚਲਾਓ', bgc: 'वीडियो चलाओ' },
  'video.dataWarn': { en: 'uses mobile data (≈15 MB)', hi: 'मोबाइल डेटा लगेगा (≈15 MB)', pa: 'ਮੋਬਾਈਲ ਡਾਟਾ ਲੱਗੇਗਾ (≈15 MB)', bgc: 'मोबाइल डेटा लाग्गैगा (≈15 MB)' },
  'video.watch': { en: 'Watch on YouTube ↗', hi: 'YouTube पर देखो ↗', pa: 'YouTube ਤੇ ਵੇਖੋ ↗', bgc: 'YouTube पै देखो ↗' },
  'video.open': { en: 'Open on YouTube ↗', hi: 'YouTube पर खोलो ↗', pa: 'YouTube ਤੇ ਖੋਲ੍ਹੋ ↗', bgc: 'YouTube पै खोलो ↗' },
  'video.cantPlay': { en: 'This video can’t play here. Read the steps below, or:', hi: 'यह वीडियो यहाँ नहीं चलेगा। नीचे चरण पढ़ें, या:', pa: 'ਇਹ ਵੀਡੀਓ ਇੱਥੇ ਨਹੀਂ ਚੱਲੇਗਾ। ਹੇਠਾਂ ਪੜਾਅ ਪੜ੍ਹੋ, ਜਾਂ:', bgc: 'यो वीडियो उड़ै न्ही चलैगा। तळै चरण पढ़ो, या:' },
  'video.needsInternet': { en: '▶ Video needs internet. The written steps below work offline.', hi: '▶ वीडियो के लिए इंटरनेट चाहिए। नीचे लिखे चरण बिना इंटरनेट चलते हैं।', pa: '▶ ਵੀਡੀਓ ਲਈ ਇੰਟਰਨੈੱਟ ਚਾਹੀਦਾ ਹੈ। ਹੇਠਲੇ ਲਿਖੇ ਪੜਾਅ ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਚੱਲਦੇ ਹਨ।', bgc: '▶ वीडियो खातर इंटरनेट चाहिए। तळै लिखे चरण बिना इंटरनेट चलैं सैं।' },
  'video.deepDive': { en: 'deep dive', hi: 'गहराई से', pa: 'ਡੂੰਘਾਈ ਨਾਲ', bgc: 'गहराई तै' },
  'video.sourcing': { en: '▶ Video — being sourced & verified', hi: '▶ वीडियो — खोजा और जाँचा जा रहा है', pa: '▶ ਵੀਡੀਓ — ਲੱਭਿਆ ਤੇ ਜਾਂਚਿਆ ਜਾ ਰਿਹਾ ਹੈ', bgc: '▶ वीडियो — खोज्या अर जाँच्या जा रहा सै' },

  'audio.listen': { en: 'Listen', hi: 'सुनो', pa: 'ਸੁਣੋ', bgc: 'सुणो' },
  'audio.coming': { en: 'Audio narration coming', hi: 'ऑडियो जल्द आ रहा है', pa: 'ਆਡੀਓ ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ', bgc: 'ऑडियो जल्दी आवैगा' },

  'offline.badge': { en: 'Offline — lessons, glossary & tools work. Video needs internet.', hi: 'ऑफलाइन — पाठ, शब्दकोश और औज़ार चलते हैं। वीडियो के लिए इंटरनेट चाहिए।', pa: 'ਆਫ਼ਲਾਈਨ — ਪਾਠ, ਸ਼ਬਦਕੋਸ਼ ਤੇ ਔਜ਼ਾਰ ਚੱਲਦੇ ਹਨ। ਵੀਡੀਓ ਲਈ ਇੰਟਰਨੈੱਟ ਚਾਹੀਦਾ ਹੈ।', bgc: 'ऑफलाइन — पाठ, शब्दकोश अर औजार चलैं सैं। वीडियो खातर इंटरनेट चाहिए।' },

  'badge.coming': { en: 'coming — showing', hi: 'जल्द आ रही है — दिखा रहे हैं', pa: 'ਜਲਦੀ ਆ ਰਹੀ ਹੈ — ਦਿਖਾ ਰਹੇ ਹਾਂ', bgc: 'जल्दी आवैगी — दिखा रे सां' },
  'badge.draft': { en: 'is a machine draft — it may have mistakes and hasn’t been checked by a person yet.', hi: 'एक मशीनी ड्राफ्ट है — इसमें गलतियाँ हो सकती हैं और अभी किसी व्यक्ति ने जाँचा नहीं।', pa: 'ਇੱਕ ਮਸ਼ੀਨੀ ਡਰਾਫ਼ਟ ਹੈ — ਇਸ ਵਿੱਚ ਗ਼ਲਤੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ ਤੇ ਹਾਲੇ ਕਿਸੇ ਨੇ ਜਾਂਚਿਆ ਨਹੀਂ।', bgc: 'एक मशीनी ड्राफ्ट सै — इसमें गलती हो सकैं अर अभी किसे नै जाँच्या न्ही।' },

  'filter.all': { en: 'All', hi: 'सभी', pa: 'ਸਾਰੇ', bgc: 'सारे' },
  'disc.noMatch': { en: 'No matches', hi: 'कोई मेल नहीं', pa: 'ਕੋਈ ਮੇਲ ਨਹੀਂ', bgc: 'कोई मेल न्ही' },
  'disc.woodsTitle': { en: 'Woods & boards', hi: 'लकड़ी और बोर्ड', pa: 'ਲੱਕੜ ਤੇ ਬੋਰਡ', bgc: 'लकड़ी अर बोर्ड' },
  'search.tool': { en: 'Name a tool: randa / रंदा / plane', hi: 'औज़ार का नाम: रंदा / randa', pa: 'ਔਜ਼ਾਰ ਦਾ ਨਾਂ: ਰੰਦਾ / randa', bgc: 'औजार का नाम: रंदा / randa' },
  'search.wood': { en: 'Wood or board: sheesham / शीशम / ply', hi: 'लकड़ी या बोर्ड: शीशम / ply', pa: 'ਲੱਕੜ ਜਾਂ ਬੋਰਡ: ਸ਼ੀਸ਼ਮ / ply', bgc: 'लकड़ी या बोर्ड: शीशम / ply' },
  'search.glossary': { en: 'Search a word: kickback / किकबैक', hi: 'शब्द खोजें: किकबैक / kickback', pa: 'ਸ਼ਬਦ ਲੱਭੋ: ਕਿੱਕਬੈਕ / kickback', bgc: 'शब्द खोजो: किकबैक / kickback' },
  'search.fixit': { en: 'Describe the problem: gap, tear-out, bubble…', hi: 'समस्या बताएँ: गैप, टियर-आउट, बुलबुला…', pa: 'ਸਮੱਸਿਆ ਦੱਸੋ: ਗੈਪ, ਟੀਅਰ-ਆਊਟ, ਬੁਲਬੁਲਾ…', bgc: 'दिक्कत बताओ: गैप, टियर-आउट, बुलबुला…' },

  'projects.intro': { en: 'Pick what you want to build. Each project lists the skills, tools and boards it needs.', hi: 'जो बनाना है चुनो। हर प्रोजेक्ट उसके ज़रूरी कौशल, औज़ार और बोर्ड बताता है।', pa: 'ਜੋ ਬਣਾਉਣਾ ਹੈ ਚੁਣੋ। ਹਰ ਪ੍ਰੋਜੈਕਟ ਉਸ ਦੇ ਲੋੜੀਂਦੇ ਹੁਨਰ, ਔਜ਼ਾਰ ਤੇ ਬੋਰਡ ਦੱਸਦਾ ਹੈ।', bgc: 'जो बणाणा सै चुणो। हर प्रोजेक्ट उसकै जरूरी हुनर, औजार अर बोर्ड बतावै सै।' },
  'projects.skills': { en: 'Skills you’ll use', hi: 'जो कौशल इस्तेमाल होंगे', pa: 'ਜੋ ਹੁਨਰ ਵਰਤੇ ਜਾਣਗੇ', bgc: 'जो हुनर इस्तेमाल होंगे' },
  'projects.estimating': { en: 'Estimating:', hi: 'एस्टिमेट:', pa: 'ਅੰਦਾਜ਼ਾ:', bgc: 'एस्टिमेट:' },
  'fixit.intro': { en: 'Something went wrong? Find the problem and how to recover.', hi: 'कुछ गड़बड़ हुई? समस्या और उसका हल ढूँढें।', pa: 'ਕੁਝ ਗ਼ਲਤ ਹੋਇਆ? ਸਮੱਸਿਆ ਤੇ ਹੱਲ ਲੱਭੋ।', bgc: 'कुछ गड़बड़ होई? दिक्कत अर उसका हल ढूँढो।' },
  'fixit.problem': { en: 'Problem.', hi: 'समस्या।', pa: 'ਸਮੱਸਿਆ।', bgc: 'दिक्कत।' },
  'fixit.why': { en: 'Why.', hi: 'क्यों।', pa: 'ਕਿਉਂ।', bgc: 'क्यूँ।' },
  'fixit.fix': { en: 'Fix.', hi: 'हल।', pa: 'ਹੱਲ।', bgc: 'हल।' },

  // Tool categories (filter chips)
  'cat.measuring-marking': { en: 'Measure', hi: 'नाप', pa: 'ਨਾਪ', bgc: 'नाप' },
  'cat.cutting': { en: 'Cut', hi: 'काट', pa: 'ਕੱਟ', bgc: 'काट' },
  'cat.planing': { en: 'Plane', hi: 'रंदा', pa: 'ਰੰਦਾ', bgc: 'रंदा' },
  'cat.chisel': { en: 'Chisel', hi: 'छेनी', pa: 'ਛੈਣੀ', bgc: 'छेनी' },
  'cat.striking': { en: 'Strike', hi: 'चोट', pa: 'ਚੋਟ', bgc: 'चोट' },
  'cat.boring': { en: 'Bore', hi: 'छेद', pa: 'ਛੇਕ', bgc: 'छेद' },
  'cat.holding': { en: 'Hold', hi: 'पकड़', pa: 'ਪਕੜ', bgc: 'पकड़' },
  'cat.fastening': { en: 'Fasten', hi: 'कसना', pa: 'ਕਸਣਾ', bgc: 'कसणा' },
  'cat.power': { en: 'Power', hi: 'पावर', pa: 'ਪਾਵਰ', bgc: 'पावर' },
  'cat.machine': { en: 'Machine', hi: 'मशीन', pa: 'ਮਸ਼ੀਨ', bgc: 'मशीन' },
  'cat.finishing': { en: 'Finish', hi: 'फिनिश', pa: 'ਫ਼ਿਨਿਸ਼', bgc: 'फिनिश' },
  'cat.safety': { en: 'Safety', hi: 'सुरक्षा', pa: 'ਸੁਰੱਖਿਆ', bgc: 'सुरक्षा' },

  // Glossary categories
  'gcat.tool': { en: 'Tool', hi: 'औज़ार', pa: 'ਔਜ਼ਾਰ', bgc: 'औजार' },
  'gcat.wood': { en: 'Wood', hi: 'लकड़ी', pa: 'ਲੱਕੜ', bgc: 'लकड़ी' },
  'gcat.material': { en: 'Material', hi: 'सामग्री', pa: 'ਸਮੱਗਰੀ', bgc: 'सामग्री' },
  'gcat.joint': { en: 'Joint', hi: 'जोड़', pa: 'ਜੋੜ', bgc: 'जोड़' },
  'gcat.technique': { en: 'Technique', hi: 'तकनीक', pa: 'ਤਕਨੀਕ', bgc: 'तकनीक' },
  'gcat.finishing': { en: 'Finishing', hi: 'फिनिशिंग', pa: 'ਫ਼ਿਨਿਸ਼ਿੰਗ', bgc: 'फिनिशिंग' },
  'gcat.hardware': { en: 'Hardware', hi: 'हार्डवेयर', pa: 'ਹਾਰਡਵੇਅਰ', bgc: 'हार्डवेयर' },
  'gcat.business': { en: 'Business', hi: 'व्यापार', pa: 'ਵਪਾਰ', bgc: 'व्यापार' },
  'gcat.safety': { en: 'Safety', hi: 'सुरक्षा', pa: 'ਸੁਰੱਖਿਆ', bgc: 'सुरक्षा' },
}

export function t(key: string, locale: Locale): string {
  const entry = UI[key]
  if (!entry) return key
  return entry[locale] ?? entry[FALLBACK_LOCALE] ?? entry.en
}
