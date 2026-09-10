import { Link } from "react-router-dom";


const footerSections = [
  {
    title: "Clinic",
    links: [
      { to: "/doctors", label: "Find Doctors" },
      { href: "/#services", label: "Services" },
      { href: "/#about", label: "About" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/#contact", label: "Contact" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#privacy", label: "Privacy Policy" },
    ],
  },
];



export default function PublicFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <Link to="/" className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors">CarePoint Clinic</Link>
              <p className="mt-3 text-sm text-slate-500 max-w-xs">Simple, patient-first appointment booking and care coordination</p>
            </div>


            {footerSections.map((section) =>(
              <nav key={section.title} aria-label="{`${section.title} navigation`}">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">{section.title}</h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) =>(
                    <li>
                      {link.to ? (
                        <Link to={link.to} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">{link.label}</Link>
                      ):(<a href={link.href} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">{link.label}</a>)}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>


          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} CarePoint Clinic. All rights reserved.</p>
            <p className="text-xs text-slate-400">Built with care for patients and providers</p>
          </div>
        </div>
    </footer>
  );
}
