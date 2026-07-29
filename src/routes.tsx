import type { RouteRecord } from 'vite-react-ssg'
import { LOCALES } from './i18n/locales'
import { levels, lessonIndex, projects } from './content/refdata'
import { loadLessonBody } from './content/loaders'
import Layout from './components/Layout'
import LangSelect from './routes/LangSelect'
import Home from './routes/Home'
import Level from './routes/Level'
import Lesson from './routes/Lesson'
import ToolFinder from './routes/ToolFinder'
import WoodFinder from './routes/WoodFinder'
import Glossary from './routes/Glossary'
import Projects from './routes/Projects'
import ProjectDetail from './routes/ProjectDetail'
import FixIt from './routes/FixIt'
import Me from './routes/Me'
import Styleguide from './routes/Styleguide'
import NotFound from './routes/NotFound'
import RouteError from './routes/RouteError'

// M1 skeleton route table. Every path here is STATIC (no :params), so vite-react-ssg
// prerenders each one to its own real HTML file — which is exactly what makes deep
// links + refresh work on GitHub Pages (no server rewrites needed).
//
// Prerendered outputs (under dist/, base /Kaarigar/):
//   /                      -> language select splash
//   /en /hi /pa /bgc       -> per-locale home
//   /en/level/l00 (+hi/pa/bgc) -> a NESTED deep route, proving deep-linking
//
// Real content and the full IA (docs/PLAN.md §2.2) arrive in later milestones.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <LangSelect /> },
      ...LOCALES.flatMap((lang) => [
        { path: lang, element: <Home lang={lang} /> },
        ...levels.map((lv) => ({
          path: `${lang}/level/${lv.id}`,
          element: <Level lang={lang} levelId={lv.id} />,
        })),
        ...lessonIndex.map((meta) => ({
          path: `${lang}/lesson/${meta.id}`,
          element: <Lesson lang={lang} lessonId={meta.id} />,
          // Lazy-load THIS lesson's body only. Prerendered into HTML by vite-react-ssg
          // and fetched as its own chunk on client navigation (docs/CONTENT-LAZY-LOADING.md).
          loader: () => loadLessonBody(meta.id),
        })),
        { path: `${lang}/tools`, element: <ToolFinder lang={lang} /> },
        { path: `${lang}/woods`, element: <WoodFinder lang={lang} /> },
        { path: `${lang}/glossary`, element: <Glossary lang={lang} /> },
        { path: `${lang}/build`, element: <Projects lang={lang} /> },
        ...projects.map((p) => ({
          path: `${lang}/project/${p.id}`,
          element: <ProjectDetail lang={lang} projectId={p.id} />,
        })),
        { path: `${lang}/fix`, element: <FixIt lang={lang} /> },
        { path: `${lang}/me`, element: <Me lang={lang} /> },
      ]),
      { path: 'styleguide', element: <Styleguide /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
