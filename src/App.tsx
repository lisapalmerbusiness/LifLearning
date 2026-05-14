/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Wallet, 
  Briefcase, 
  Heart, 
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Instagram,
  Twitter,
  Linkedin,
  HelpCircle,
  Users
} from 'lucide-react';

type View = 'home' | 'about' | 'blog' | 'resources' | 'newsletter' | 'lifcourses' | 'lifcoaching' | 'faq';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds on first load
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('liflearning_popup_seen');
      if (!hasSeenPopup) {
        setShowPopup(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const dismissPopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('liflearning_popup_seen', 'true');
  };

  const toggleView = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navGroups = {
    learn: {
      label: 'Learn',
      items: [
        { label: 'LifCourses', view: 'lifcourses' as View },
        { label: 'LifCoaching', view: 'lifcoaching' as View },
        { label: 'Resources', view: 'resources' as View },
      ]
    },
    read: {
      label: 'Read',
      items: [
        { label: 'Blog', view: 'blog' as View },
        { label: 'Newsletter', view: 'newsletter' as View },
      ]
    },
    about: {
      label: 'About',
      items: [
        { label: 'About', view: 'about' as View },
        { label: 'FAQ', view: 'faq' as View },
      ]
    }
  };

  return (
    <div className="min-h-screen selection:bg-orange/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="text-2xl font-display font-bold text-teal cursor-pointer flex items-center gap-2"
            onClick={() => toggleView('home')}
            id="logo"
          >
            Lif<span className="text-orange">Learning</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <button 
              onClick={() => toggleView('home')}
              className={`hover:text-orange transition-colors ${currentView === 'home' ? 'text-orange underline underline-offset-8' : 'text-teal'}`}
              id="nav-home"
            >
              Home
            </button>

            {Object.entries(navGroups).map(([key, group]) => (
              <div 
                key={key}
                className="relative group h-full flex items-center"
                onMouseEnter={() => setOpenDropdown(key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  className={`flex items-center gap-1 hover:text-orange transition-colors ${group.items.some(item => item.view === currentView) ? 'text-orange underline underline-offset-8' : 'text-teal'}`}
                >
                  {group.label} <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === key ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openDropdown === key && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-teal/10 py-3 overflow-hidden"
                    >
                      {group.items.map((item) => (
                        <button
                          key={item.view}
                          onClick={() => toggleView(item.view)}
                          className={`w-full text-left px-6 py-2.5 hover:bg-teal/5 transition-colors ${currentView === item.view ? 'text-orange bg-orange/5' : 'text-teal'}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <button className="bg-teal text-cream px-6 py-2 rounded-full hover:bg-deep-teal transition-all shadow-lg hover:shadow-teal/20" id="nav-cta">
              Get Started
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-teal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 right-0 bg-cream border-b border-teal/10 p-6 flex flex-col gap-8 max-h-[80vh] overflow-y-auto"
              id="mobile-menu"
            >
              <button 
                onClick={() => toggleView('home')}
                className={`text-xl font-bold ${currentView === 'home' ? 'text-orange' : 'text-teal'}`}
              >
                Home
              </button>

              {Object.entries(navGroups).map(([key, group]) => (
                <div key={key} className="space-y-4">
                  <h4 className="text-xs font-bold text-teal/40 uppercase tracking-widest px-1">{group.label}</h4>
                  <div className="flex flex-col gap-4">
                    {group.items.map((item) => (
                      <button 
                        key={item.view}
                        onClick={() => toggleView(item.view)}
                        className={`text-xl font-medium text-left px-1 ${currentView === item.view ? 'text-orange' : 'text-teal'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              <button className="bg-teal text-cream px-6 py-3 rounded-full font-medium text-center">
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.section 
              key="home"
              id="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <div className="relative py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 relative z-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide"
                    >
                      THE REAL WORLD 101
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl leading-tight text-deep-teal" id="hero-title">
                      Your life. <br />
                      <span className="text-teal italic">In focus.</span> <br />
                      Finally.
                    </h1>
                    <p className="text-xl md:text-2xl text-teal/80 max-w-xl leading-relaxed">
                      The financial literacy and life skills education school never gave you. We provide the blueprint for young adults and creators in Chicago and beyond who are figuring it out in real time with no one to call.
                    </p>
                    
                    {/* Email Capture (Kit Embed) */}
                    <div className="max-w-lg">
                      <form 
                        action="https://app.kit.com/forms/9379236/subscriptions" 
                        className="seva-form formkit-form" 
                        method="post" 
                        data-sv-form="9379236" 
                        data-uid="b3dbdbc392" 
                        data-format="inline" 
                        data-version="5" 
                        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
                      >
                        <div data-style="clean">
                          <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                          <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields">
                            <div className="formkit-field">
                              <input 
                                className="formkit-input" 
                                name="email_address" 
                                aria-label="Email Address" 
                                placeholder="Email Address" 
                                required 
                                type="email" 
                                style={{ color: 'rgb(0, 0, 0)', borderColor: 'rgb(227, 227, 227)', borderRadius: '4px', fontWeight: 400 }} 
                              />
                            </div>
                            <button 
                              data-element="submit" 
                              className="formkit-submit formkit-submit" 
                              style={{ color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(255, 69, 0)', borderRadius: '12px', fontWeight: 700, padding: '12px 24px', transition: 'all 0.3s' }}
                            >
                              <div className="formkit-spinner"><div></div><div></div><div></div></div>
                              <span className="">Get The Real Adult Checklist — Free</span>
                            </button>
                          </div>
                          <div className="formkit-powered-by-convertkit-container">
                            <a href="https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic" data-element="powered-by" className="formkit-powered-by-convertkit opacity-50 text-xs" data-variant="dark" target="_blank" rel="nofollow noopener">Built with Kit</a>
                          </div>
                        </div>
                        <style dangerouslySetInnerHTML={{ __html: `
                          .formkit-form[data-uid="b3dbdbc392"] *{box-sizing:border-box;}
                          .formkit-form[data-uid="b3dbdbc392"] .formkit-input{width:100%; display: block; margin-bottom: 10px; border-radius: 12px; padding: 12px 16px; border: 1px solid #00808020; font-size: 16px;}
                          .formkit-form[data-uid="b3dbdbc392"] .formkit-submit{width:100%; display: block; border: none; cursor: pointer; position: relative;}
                          .formkit-form[data-uid="b3dbdbc392"] .formkit-submit:hover{background-color: #e63e00 !important;}
                          .formkit-form[data-uid="b3dbdbc392"] .formkit-alert{padding: 10px; border-radius: 8px; margin-bottom: 15px; font-size: 14px; text-align: center;}
                          .formkit-form[data-uid="b3dbdbc392"] .formkit-alert-success{background: #d3fbeb; color: #0c905c; border: 1px solid #10bf7a;}
                          .formkit-form[data-uid="b3dbdbc392"] .formkit-alert-error{background: #fde8e2; color: #ea4110; border: 1px solid #f2643b;}
                          @media (min-width: 640px) {
                            .formkit-form[data-uid="b3dbdbc392"] .formkit-fields { display: flex; gap: 10px; align-items: flex-start; }
                            .formkit-form[data-uid="b3dbdbc392"] .formkit-field { flex: 1; }
                            .formkit-form[data-uid="b3dbdbc392"] .formkit-submit { width: auto; margin-bottom: 0; }
                            .formkit-form[data-uid="b3dbdbc392"] .formkit-input { margin-bottom: 0; }
                          }
                          /* Spinner Styles */
                          .formkit-spinner{display:none; height:0; width:0; margin:0 auto; position:absolute; top:0; left:0; right:0; overflow:hidden; text-align:center; transition:all 300ms ease-in-out;}
                          .formkit-spinner > div{margin:auto; width:12px; height:12px; background-color:#fff; opacity:0.3; border-radius:100%; display:inline-block; animation:formkit-bouncedelay 1.4s infinite ease-in-out both;}
                          .formkit-submit[data-active] .formkit-spinner{display:flex; opacity:1; height:100%; width:100%; background: inherit; border-radius: inherit;}
                          .formkit-submit[data-active] span{opacity:0;}
                          @keyframes formkit-bouncedelay{0%,80%,100%{transform:scale(0);} 40%{transform:scale(1);}}
                        ` }} />
                      </form>
                    </div>
                  </div>
                  
                  {/* Visual Element */}
                  <div className="relative hidden lg:block">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
                    <div className="relative grid grid-cols-2 gap-4">
                      <div className="space-y-4 pt-12">
                        <div className="aspect-square bg-teal rounded-3xl overflow-hidden shadow-2xl rotate-3 flex items-center justify-center">
                           <Wallet className="text-cream w-20 h-20 opacity-20" />
                        </div>
                        <div className="aspect-[4/5] bg-orange rounded-3xl overflow-hidden shadow-2xl -rotate-2 flex items-center justify-center">
                           <Briefcase className="text-cream w-20 h-20 opacity-20" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="aspect-[3/4] bg-deep-teal rounded-3xl overflow-hidden shadow-2xl -rotate-3 flex items-center justify-center">
                            <Heart className="text-cream w-20 h-20 opacity-20" />
                        </div>
                        <div className="aspect-square bg-teal/20 rounded-3xl overflow-hidden shadow-xl border-2 border-teal/10 flex items-center justify-center backdrop-blur-xl">
                           <span className="text-teal font-display font-bold text-4xl">Focus.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What is LifLearning Section */}
              <div className="bg-teal/5 py-24 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <h2 className="text-4xl md:text-5xl text-deep-teal">School taught you a lot. Just not the right stuff.</h2>
                  <p className="text-xl md:text-2xl text-teal/70 leading-relaxed">
                    We cover the essential adulting toolkit school skipped. Plain language. Real situations. No fluff. From high-yield savings to workplace etiquette, we provide life skills for every age and every stage.
                  </p>
                </div>
              </div>

              {/* What You'll Get Section */}
              <div className="bg-white py-24 px-6 border-y border-teal/5">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl text-deep-teal">The Real Adulting 101 Checklist — Yours Free.</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" id="pillars-grid">
                    {/* Financial Literacy */}
                    <div className="group p-8 bg-cream rounded-[40px] border border-teal/5 hover:border-teal/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-teal/5">
                      <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal mb-6 group-hover:scale-110 transition-transform">
                        <Wallet size={32} />
                      </div>
                      <h3 className="text-xl mb-3">Financial Literacy</h3>
                      <p className="text-teal/70 leading-relaxed text-base">
                        Money habits that actually stick.
                      </p>
                    </div>

                    {/* Legal & Contracts */}
                    <div className="group p-8 bg-cream rounded-[40px] border border-teal/5 hover:border-teal/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-teal/5">
                      <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-6 group-hover:scale-110 transition-transform">
                        <Briefcase size={32} />
                      </div>
                      <h3 className="text-xl mb-3">Legal & Contracts</h3>
                      <p className="text-teal/70 leading-relaxed text-base">
                        What to check before you sign anything.
                      </p>
                    </div>

                    {/* Career Strategy */}
                    <div className="group p-8 bg-cream rounded-[40px] border border-teal/5 hover:border-teal/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-teal/5">
                      <div className="w-16 h-16 bg-deep-teal/10 rounded-2xl flex items-center justify-center text-deep-teal mb-6 group-hover:scale-110 transition-transform">
                        <Heart size={32} />
                      </div>
                      <h3 className="text-xl mb-3">Career Strategy</h3>
                      <p className="text-teal/70 leading-relaxed text-base">
                        The workplace skills nobody teaches before day one.
                      </p>
                    </div>

                    {/* Financial Confidence */}
                    <div className="group p-8 bg-cream rounded-[40px] border border-teal/5 hover:border-teal/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-teal/5">
                      <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal mb-6 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl mb-3">Financial Confidence</h3>
                      <p className="text-teal/70 leading-relaxed text-base">
                        The one move that reduces stress fastest.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === 'about' && (
            <motion.section 
              key="about" 
              id="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6"
            >
              <div className="max-w-4xl mx-auto">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block bg-teal/10 text-teal px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide"
                    >
                      THE FOUNDER
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl text-deep-teal leading-tight" id="about-title">
                      Bridging the adulting gap — <br />
                      <span className="adulting-gap-text">because it matters.</span>
                    </h2>
                  </div>

                  <div className="prose prose-xl prose-teal text-teal/80 space-y-8 leading-relaxed">
                    <p>
                      I didn’t want just any business. I wanted one that mattered. For years I told people I’d be a business owner someday. I saw a gap in the way we teach young people how to survive and thrive. That’s why LifLearning (Life In Focus Learning) exists.
                    </p>
                    
                    <div className="bg-orange/5 border-l-4 border-orange p-8 rounded-r-3xl my-12">
                      <p className="text-orange font-bold text-2xl mb-4">The Activation</p>
                      <p className="text-deep-teal/80 m-0">
                        In 2020 I had $600 every two weeks for months. I have nothing to show for it. No savings. No investment. I wasn't bad with money; I just never had a foundation. As a Chicago-based entrepreneur, I realized that the first step in financial literacy isn’t a budget—it’s a goal.
                      </p>
                    </div>

                    <p>
                      This is what I built instead.
                    </p>

                    <div className="bg-teal/5 p-8 rounded-3xl border border-teal/10">
                      <h3 className="text-3xl text-deep-teal font-display mb-4">Founder Note</h3>
                      <p className="m-0">
                        LifLearning connects financial literacy and life skills—because they’ve always been connected. I’m Shalisa, and I’ve lived the gap. I built the resource I wish existed for the next generation of leaders and creators.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-12 border-t border-teal/10 flex flex-col md:flex-row items-center gap-8">
                     <div className="w-24 h-24 bg-teal rounded-full overflow-hidden flex-shrink-0 grayscale">
                        <div className="w-full h-full bg-gradient-to-br from-teal to-orange flex items-center justify-center text-cream font-bold text-xl">S</div>
                     </div>
                     <div>
                        <p className="text-xl font-bold text-deep-teal mb-1">Shalisa Life</p>
                        <p className="text-teal/60">Founder, LifLearning</p>
                     </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === 'blog' && (
            <motion.section 
              key="blog" 
              id="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6"
            >
              <div className="max-w-4xl mx-auto space-y-20">
                {/* Blog Header */}
                <div className="text-center space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block bg-orange/10 text-orange px-6 py-2 rounded-full text-lg font-bold tracking-wide"
                  >
                    BLOG — COMING SOON
                  </motion.div>
                  <h2 className="text-5xl md:text-7xl text-deep-teal">Real talk. <br /><span className="text-teal italic">Coming May 19th.</span></h2>
                  <p className="text-xl md:text-2xl text-teal/60 leading-relaxed max-w-2xl mx-auto">
                    The LifLearning Blog drops every Tuesday and Thursday — financial literacy, life skills, and the adulting conversations nobody is having out loud.
                  </p>
                </div>

                {/* Topics Section */}
                <div className="space-y-12">
                  <h3 className="text-3xl text-center text-deep-teal font-display">What we'll be covering:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { emoji: "💰", text: "Budgeting when money is tight" },
                      { emoji: "🏠", text: "What to check before you sign a lease" },
                      { emoji: "💼", text: "Workplace skills school never taught you" },
                      { emoji: "💳", text: "Credit scores in plain English" },
                      { emoji: "🗣️", text: "The conversations you've been avoiding" },
                      { emoji: "🧭", text: "Family dynamics and money — together" }
                    ].map((topic, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-teal/5 flex items-center gap-4 hover:shadow-lg hover:border-teal/20 transition-all cursor-default"
                      >
                        <span className="text-3xl">{topic.emoji}</span>
                        <span className="text-lg font-medium text-deep-teal">{topic.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Blog Email Capture */}
                <div className="bg-orange rounded-[40px] p-12 text-center text-cream space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-deep-teal/10 rounded-full -ml-20 -mb-20 blur-3xl" />
                  
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-3xl md:text-4xl font-display font-bold">Don't miss the first post.</h3>
                    <p className="text-cream/80 text-lg max-w-md mx-auto">
                      Drop your email and we'll notify you the moment the blog goes live.
                    </p>
                  </div>

                  <div className="relative z-10 max-w-lg mx-auto">
                    {/* Reuse Kit form but with specific styling/text */}
                    <form 
                      action="https://app.kit.com/forms/9379236/subscriptions" 
                      className="seva-form formkit-form" 
                      method="post" 
                      data-sv-form="9379236" 
                      data-uid="b3dbdbc392"
                    >
                       <div className="flex flex-col sm:flex-row gap-3">
                        <input 
                          type="email" 
                          name="email_address" 
                          placeholder="Email Address" 
                          required 
                          className="flex-1 px-6 py-4 rounded-2xl text-deep-teal focus:outline-none focus:ring-4 focus:ring-white/20"
                        />
                        <button 
                          className="bg-deep-teal text-cream px-8 py-4 rounded-2xl font-bold hover:bg-deep-teal/90 transition-all shadow-xl"
                        >
                          Notify Me
                        </button>
                      </div>
                      <p className="mt-4 text-sm text-cream/60">No spam. Just real talk, twice a week.</p>
                      {/* Hidden Kit fields for the script to pick up if needed */}
                      <div className="hidden">
                        <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === 'resources' && (
            <motion.section 
              key="resources" 
              id="resources"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6"
            >
              <div className="max-w-7xl mx-auto space-y-24">
                {/* Header */}
                <div className="max-w-3xl space-y-6">
                  <h2 className="text-5xl md:text-6xl text-deep-teal leading-tight">
                    The stuff nobody handed you. <br />
                    <span className="text-teal underline decoration-orange/30 underline-offset-8">All in one place.</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-teal/70 leading-relaxed">
                    Free resources, guides, and tools for every stage of the adulting journey. Built for real life — not a textbook.
                  </p>
                </div>

                {/* Financial Resources */}
                <div className="space-y-10">
                  <div className="space-y-2">
                    <h3 className="text-3xl text-deep-teal flex items-center gap-3">💰 FINANCIAL RESOURCES</h3>
                    <p className="text-xl text-teal/60">Get your money right.</p>
                    <p className="text-teal/50">Plain-language guides on budgeting, credit, and the financial basics school skipped.</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-[32px] border border-teal/5 shadow-xl shadow-teal/5 flex flex-col justify-between hover:border-teal/20 transition-all">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center text-teal">
                          <CheckCircle2 size={24} />
                        </div>
                        <h4 className="text-2xl font-bold text-deep-teal">The Real Adult Checklist</h4>
                        <p className="text-teal/70 leading-relaxed">
                          The financial and life skills basics school never covered — in one free resource you can actually use today.
                        </p>
                      </div>
                      <button className="mt-8 bg-teal text-cream px-6 py-3 rounded-xl font-bold hover:bg-deep-teal transition-colors flex items-center justify-center gap-2">
                        Download Free <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Entrepreneur Resources */}
                <div className="space-y-10">
                  <div className="space-y-2">
                    <h3 className="text-3xl text-deep-teal flex items-center gap-3">🚀 ENTREPRENEUR RESOURCES</h3>
                    <p className="text-xl text-teal/60">Build something of your own.</p>
                    <p className="text-teal/50">Tools and guides for founders, side hustlers, and anyone betting on themselves.</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-cream/50 p-8 rounded-[32px] border border-dashed border-teal/20 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange">
                          <Briefcase size={24} />
                        </div>
                        <h4 className="text-2xl font-bold text-deep-teal/40 italic">Coming soon...</h4>
                        <p className="text-teal/50 leading-relaxed">
                          More resources dropping soon. Subscribe to the newsletter so you don't miss them.
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleView('blog')}
                        className="mt-8 border-2 border-teal text-teal px-6 py-3 rounded-xl font-bold hover:bg-teal hover:text-cream transition-all"
                      >
                        Notify Me
                      </button>
                    </div>
                  </div>
                </div>

                {/* School Resources */}
                <div className="space-y-10">
                  <div className="space-y-2">
                    <h3 className="text-3xl text-deep-teal flex items-center gap-3">🎓 SCHOOL RESOURCES</h3>
                    <p className="text-xl text-teal/60">Navigate the academic side of adulting.</p>
                    <p className="text-teal/50">From college planning to transfer prep — the guidance counselor conversation you never got to have.</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-cream/50 p-8 rounded-[32px] border border-dashed border-teal/20 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-deep-teal/10 rounded-xl flex items-center justify-center text-deep-teal">
                          <Heart size={24} />
                        </div>
                        <h4 className="text-2xl font-bold text-deep-teal/40 italic">Coming soon...</h4>
                        <p className="text-teal/50 leading-relaxed">
                          More resources dropping soon. Subscribe to the newsletter so you don't miss them.
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleView('blog')}
                        className="mt-8 border-2 border-teal text-teal px-6 py-3 rounded-xl font-bold hover:bg-teal hover:text-cream transition-all"
                      >
                        Notify Me
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="bg-deep-teal rounded-[40px] p-12 md:p-20 text-center text-cream space-y-8">
                  <h3 className="text-3xl md:text-5xl font-display font-bold">Have a resource you wish existed?</h3>
                  <p className="text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
                    Tell us what's missing. LifLearning is built by and for the people who needed this — your input shapes what we build next.
                  </p>
                  <a 
                    href="mailto:hello@liflearning.com" 
                    className="inline-flex bg-orange text-cream px-10 py-4 rounded-2xl font-bold hover:bg-orange/90 transition-all shadow-xl shadow-orange/20 text-lg"
                  >
                    Email Us — hello@liflearning.com
                  </a>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === 'newsletter' && (
            <motion.section 
              key="newsletter" 
              id="newsletter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6"
            >
              <div className="max-w-4xl mx-auto space-y-20">
                {/* Header */}
                <div className="text-center space-y-6">
                  <h2 className="text-5xl md:text-7xl text-deep-teal">Weekly-ish real talk. <br /><span className="text-orange italic">Straight to your inbox.</span></h2>
                  <p className="text-xl md:text-2xl text-teal/70 leading-relaxed max-w-2xl mx-auto">
                    The LifLearning Newsletter drops every Wednesday — financial literacy, life skills, and the adulting conversations nobody is having out loud. No fluff. No spam. Just the stuff you actually needed years ago.
                  </p>
                  <p className="text-orange font-bold text-lg">First issue: Wednesday, May 20th. Don't miss it.</p>
                </div>

                {/* Preview Section */}
                <div className="space-y-10">
                  <h3 className="text-3xl text-center text-deep-teal font-display">Here's what a typical Wednesday looks like:</h3>
                  
                  {/* Mock Email Card */}
                  <div className="bg-white rounded-[40px] border border-teal/10 shadow-2xl overflow-hidden max-w-2xl mx-auto">
                    <div className="bg-teal/5 border-b border-teal/10 px-8 py-4 text-sm text-teal/60 font-mono">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-orange/20" />
                           <div className="w-3 h-3 rounded-full bg-teal/20" />
                           <div className="w-3 h-3 rounded-full bg-deep-teal/10" />
                        </div>
                        <span>liflearning.com</span>
                      </div>
                    </div>
                    <div className="p-8 md:p-12 space-y-6 text-deep-teal leading-relaxed">
                      <div className="space-y-1">
                        <p className="font-bold">📬 From: <span className="font-normal">Shalisa at LifLearning</span></p>
                        <p className="font-bold">Subject: <span className="font-normal">Your paycheck disappeared again. Here's why.</span></p>
                      </div>
                      <div className="pt-4 space-y-4">
                        <p>Hey —</p>
                        <p>Let's talk about the money that left before you even noticed it was there.</p>
                        <p>This week we're breaking down the three things silently draining your account — and what to do about each one before your next payday hits.</p>
                        <p>Also this week: the one sentence that gets you out of any awkward money conversation with family. I'm giving you the exact words.</p>
                        <p>And a quick life skill reminder that's going to save you from a situation you didn't even know was coming.</p>
                        <p>Let's get into it. 👇🏾</p>
                        <p className="pt-4">— Shalisa</p>
                        <div className="pt-8 text-xs text-teal/40 border-t border-teal/5">
                          LifLearning · Life In Focus · liflearning.com <br />
                          Unsubscribe anytime.
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-teal/60 italic">That's what lands in your inbox every Wednesday. Real topics. Real talk. No textbook energy.</p>
                </div>

                {/* Newsletter Email Capture */}
                <div className="bg-white rounded-[40px] border-4 border-orange p-12 text-center space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-4xl text-deep-teal font-display font-bold">Join the list. It's free.</h3>
                    <p className="text-xl text-teal/60">First issue hits May 20th. Drop your email and you're in.</p>
                  </div>
                  
                  <div className="max-w-lg mx-auto">
                    <form 
                      action="https://app.kit.com/forms/9379236/subscriptions" 
                      className="flex flex-col sm:flex-row gap-3" 
                      method="post"
                    >
                      <input 
                        type="email" 
                        name="email_address" 
                        placeholder="Your email address" 
                        required 
                        className="flex-1 px-6 py-4 rounded-2xl bg-cream text-deep-teal border border-teal/10 focus:outline-none focus:ring-4 focus:ring-orange/20"
                      />
                      <button 
                        className="bg-orange text-cream px-10 py-4 rounded-2xl font-bold hover:bg-orange/90 transition-all shadow-xl shadow-orange/20"
                      >
                        I'm In
                      </button>
                    </form>
                    <p className="mt-4 text-sm text-teal/40">No spam. Unsubscribe anytime. We respect your inbox.</p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === 'lifcourses' && (
            <motion.section 
              key="lifcourses" 
              id="lifcourses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6"
            >
              <div className="max-w-7xl mx-auto space-y-24">
                {/* Header */}
                <div className="max-w-3xl space-y-6">
                  <h2 className="text-5xl md:text-7xl text-deep-teal leading-tight">
                    The instruction manual <br />
                    <span className="text-orange italic">they forgot to include.</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-teal/70 leading-relaxed">
                    LifCourses are short, structured, self-paced courses on the financial and life skills topics school skipped. Built for real life. Taught in plain English.
                  </p>
                </div>

                {/* First Course Teaser */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className="inline-block bg-orange/10 text-orange px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                        FIRST COURSE — COMING SOON
                      </div>
                      <h3 className="text-4xl md:text-5xl text-deep-teal font-display">Budgeting Basics: <br />Where Did My Money Go?</h3>
                      <p className="text-xl text-teal/70 leading-relaxed">
                        You're earning. You're spending. And somehow every month you're starting from zero again. This course breaks down exactly where your money is going — and gives you a simple, realistic system to actually keep some of it. No spreadsheets that take three hours to set up. No judgment. Just a plan that works for where you are right now.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xl font-bold text-deep-teal">What you'll learn:</h4>
                      <ul className="space-y-4">
                        {[
                          "Why your money disappears even when you're \"being careful\"",
                          "The budgeting method that actually works for irregular income",
                          "How to build your first emergency fund without feeling like you're sacrificing everything",
                          "The one habit that separates people who save from people who don't"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-teal/80">
                            <CheckCircle2 className="text-orange mt-1 flex-shrink-0" size={20} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-8 text-sm text-teal/50 font-medium">
                      <span>Self-paced</span>
                      <span>•</span>
                      <span>Digital</span>
                      <span>•</span>
                      <span>Lifetime access</span>
                    </div>
                  </div>

                  <div className="bg-white p-10 md:p-14 rounded-[48px] border-4 border-teal/5 shadow-2xl space-y-10 relative">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                     <div className="relative z-10 space-y-6">
                        <h4 className="text-3xl font-display font-bold text-deep-teal">Get in early. <br />Pay less. Learn first.</h4>
                        <p className="text-lg text-teal/60">
                           Founding members get early bird pricing when the course drops — exclusively for people on the list.
                        </p>
                        <div className="flex items-center gap-4 py-4 border-y border-teal/5">
                           <div className="text-teal/40 line-through text-xl">$37</div>
                           <div className="text-4xl font-bold text-orange">$17</div>
                           <div className="bg-orange/10 text-orange px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">Early Bird Price</div>
                        </div>
                     </div>

                     <form 
                      action="https://app.kit.com/forms/9379236/subscriptions" 
                      className="space-y-6 relative z-10" 
                      method="post"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-teal/60 uppercase tracking-widest px-1">Drop your email to lock in early bird access.</label>
                        <input 
                          type="email" 
                          name="email_address" 
                          placeholder="Email Address" 
                          required 
                          className="w-full px-6 py-4 rounded-2xl bg-cream text-deep-teal border border-teal/10 focus:outline-none focus:ring-4 focus:ring-orange/20"
                        />
                      </div>
                      <button 
                        className="w-full bg-teal text-cream px-10 py-5 rounded-2xl font-bold hover:bg-deep-teal transition-all shadow-xl shadow-teal/20 text-xl"
                      >
                        Save My Spot
                      </button>
                      <p className="text-center text-sm text-teal/40 italic">No spam. Just a heads up when the course goes live.</p>
                    </form>
                  </div>
                </div>

                {/* Differentiators */}
                <div className="space-y-16">
                  <h3 className="text-4xl md:text-5xl text-center text-deep-teal font-display">This isn't another course that <br />sits in your inbox unopened.</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: <CheckCircle2 size={32} />,
                        title: "Built for your exact situation",
                        desc: "Not generic advice for \"young adults.\" Content built for the specific stage and specific problem you're dealing with right now."
                      },
                      {
                        icon: <Heart size={32} />,
                        title: "Taught like a real person is talking to you",
                        desc: "No academic language. No corporate tone. Just clear, direct instruction that actually sounds like someone who's been there."
                      },
                      {
                        icon: <Briefcase size={32} />,
                        title: "Short enough to finish",
                        desc: "Designed to be completed in stolen moments — not a 40-hour commitment you'll never get to."
                      }
                    ].map((item, i) => (
                      <div key={i} className="bg-cream p-10 rounded-[40px] space-y-6 border border-teal/5">
                        <div className="text-orange">{item.icon}</div>
                        <h4 className="text-2xl font-bold text-deep-teal leading-tight">{item.title}</h4>
                        <p className="text-teal/70 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="bg-orange rounded-[60px] p-12 md:p-24 text-center text-cream space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mt-48 blur-3xl" />
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-4xl md:text-6xl font-display font-bold">More courses are coming.</h3>
                    <p className="text-xl md:text-2xl text-cream/80 max-w-3xl mx-auto leading-relaxed">
                      Budgeting is just the beginning. LifCourses will cover credit, leases, workplace navigation, family dynamics, and more. Get on the list and you'll be the first to know — and the first to save.
                    </p>
                  </div>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="relative z-10 bg-deep-teal text-cream px-12 py-5 rounded-2xl font-bold hover:bg-deep-teal/90 transition-all shadow-2xl text-xl"
                  >
                    Save My Spot
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === 'lifcoaching' && (
            <motion.section 
              key="lifcoaching" 
              id="lifcoaching"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6"
            >
              <div className="max-w-6xl mx-auto space-y-24">
                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <h2 className="text-5xl md:text-7xl text-deep-teal font-display">One-on-one. <br /><span className="text-orange italic">Real talk. Real results.</span></h2>
                  <p className="text-xl md:text-2xl text-teal/70 leading-relaxed">
                    Sometimes you don't need a course. You need someone to sit down with you, look at your actual situation, and help you figure out the next move. That's what LifCoaching is.
                  </p>
                </div>

                {/* Who this is for */}
                <div className="bg-white p-12 md:p-16 rounded-[60px] border border-teal/10 shadow-xl space-y-10">
                  <h3 className="text-3xl md:text-4xl text-deep-teal font-display font-bold">This is for you if:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "You're navigating financial or life decisions without anyone in your corner who's done it differently",
                      "You're a first-gen student or professional figuring it out without a blueprint",
                      "You're in college and need real academic or transfer planning guidance",
                      "You have a specific situation — a budget, a lease, a workplace problem — and need a clear answer",
                      "You're ready to stop Googling and start moving"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start text-lg text-teal/80">
                        <CheckCircle2 className="text-orange mt-1 flex-shrink-0" size={24} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packages */}
                <div className="space-y-12">
                   <h3 className="text-4xl text-center text-deep-teal font-display">Pick your session.</h3>
                   <div className="grid lg:grid-cols-3 gap-8">
                      {[
                        {
                          name: "The Check-In",
                          meta: "30 minutes · $35",
                          desc: "One specific question. One clear answer. A lease you need to understand, a budget you need help starting, a workplace script you need to get right. Come with your question. Leave with a plan.",
                          cta: "Book via Email"
                        },
                        {
                          name: "The Deep Dive",
                          meta: "60 minutes + follow-up · $60",
                          desc: "For something bigger. College transfer planning, first-gen financial foundation, a career or life pivot. You leave with clarity, next steps, and a written recap so nothing falls through the cracks.",
                          cta: "Book via Email",
                          popular: true
                        },
                        {
                          name: "The Blueprint",
                          meta: "2 bi-weekly sessions · $100",
                          desc: "For people who want accountability, not just advice. Two sessions, two weeks apart, so you can implement what you learned and come back with real questions from real life.",
                          cta: "Book via Email"
                        }
                      ].map((pkg, i) => (
                        <div key={i} className={`relative bg-white p-10 rounded-[40px] border flex flex-col justify-between h-full transition-all hover:shadow-2xl ${pkg.popular ? 'border-orange shadow-xl scale-105 z-10' : 'border-teal/10'}`}>
                           {pkg.popular && (
                             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange text-cream px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                               Most Popular
                             </div>
                           )}
                           <div className="space-y-6">
                              <div className="mb-4">
                                <h4 className="text-2xl font-bold text-deep-teal">{pkg.name}</h4>
                                <p className="text-orange font-bold mt-1 uppercase text-xs tracking-widest">{pkg.meta}</p>
                              </div>
                              <p className="text-teal/70 leading-relaxed text-sm">{pkg.desc}</p>
                           </div>
                           <a 
                             href="mailto:hello@liflearning.com?subject=LifCoaching Package Selection"
                             className={`mt-10 w-full text-center py-4 rounded-2xl font-bold transition-all ${pkg.popular ? 'bg-orange text-cream hover:bg-orange/90' : 'bg-teal text-cream hover:bg-deep-teal'}`}
                           >
                              {pkg.cta}
                           </a>
                        </div>
                      ))}
                   </div>
                </div>

                {/* How it works */}
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                    <h3 className="text-4xl text-deep-teal font-display">Here's how to get started:</h3>
                    <div className="space-y-6">
                      {[
                        "Email hello@liflearning.com with the subject line \"LifCoaching\"",
                        "Tell me which package you want and what you're working through",
                        "I'll reply within 48 hours to confirm your session and next steps",
                        "We meet, we talk, you leave with a plan"
                      ].map((step, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <div className="w-10 h-10 rounded-full bg-teal text-cream flex items-center justify-center font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-lg text-teal/80">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-cream p-12 rounded-[50px] space-y-8">
                    <h3 className="text-3xl text-deep-teal font-display">What we can work on together:</h3>
                    <ul className="grid gap-4">
                       {[
                         { icon: "💰", text: "Budgeting, credit, and financial foundations" },
                         { icon: "🏠", text: "Lease review and renter rights" },
                         { icon: "🎓", text: "College planning, transfer prep, and major selection" },
                         { icon: "💼", text: "Workplace navigation and career pivots" },
                         { icon: "🗣️", text: "Difficult conversations — money, family, relationships" },
                         { icon: "🧭", text: "First-gen life navigation — no blueprint" }
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-teal/70 text-lg">
                           <span>{item.icon}</span>
                           <span>{item.text}</span>
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="bg-deep-teal rounded-[60px] p-12 md:p-24 text-center text-cream space-y-8">
                  <h3 className="text-3xl md:text-5xl font-display font-bold">You don't have to figure this out alone.</h3>
                  <p className="text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
                    That's literally why LifCoaching exists. Reach out and let's get you moving.
                  </p>
                  <a 
                    href="mailto:hello@liflearning.com?subject=LifCoaching Interest"
                    className="inline-block bg-orange text-cream px-12 py-5 rounded-2xl font-bold hover:bg-orange/90 transition-all shadow-2xl text-xl"
                  >
                    Email hello@liflearning.com to Book
                  </a>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === 'faq' && (
            <motion.section 
              key="faq" 
              id="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6"
            >
              <div className="max-w-3xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                  <h2 className="text-5xl md:text-6xl text-deep-teal font-display">FAQ</h2>
                  <p className="text-xl text-teal/60">Everything you wanted to know but felt weird asking.</p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      q: "What exactly is LifLearning?",
                      a: "LifLearning is a resource hub designed to bridge the gap between school and life. We teach the financial literacy and life skills that traditional education often skips."
                    },
                    {
                      q: "Who is this for?",
                      a: "Primarily young adults (18-30) and creators who are navigating independence for the first time, but honestly, anyone who wants a clearer focus on their life skills will find value here."
                    },
                    {
                      q: "How much are the courses?",
                      a: "Our first course, Budgeting Basics, will launch at an early-bird price of $17. We aim to keep all our digital resources accessible."
                    },
                    {
                      q: "Is there a physical location?",
                      a: "We are based in Chicago, but our primary focus is digital resources and community. Stay tuned for local events!"
                    },
                    {
                      q: "How can I get started?",
                      a: "The best way is to join our newsletter. It's free, it's real talk, and it's the best way to keep up with new resources as they drop."
                    }
                  ].map((item, i) => (
                    <div key={i} className="group bg-cream p-8 rounded-3xl border border-teal/5 hover:border-teal/20 transition-all">
                      <h4 className="text-xl font-bold text-deep-teal mb-4 flex items-center gap-3">
                        <HelpCircle className="text-orange flex-shrink-0" size={20} />
                        {item.q}
                      </h4>
                      <p className="text-teal/70 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Popup Overlay */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-deep-teal/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-cream rounded-[40px] max-w-lg w-full p-10 md:p-14 shadow-2xl relative border-t-8 border-orange"
            >
              <button 
                onClick={dismissPopup}
                className="absolute top-6 right-8 text-teal/40 hover:text-orange transition-colors"
                aria-label="Close"
              >
                <X size={32} />
              </button>

              <div className="space-y-8 text-center pt-4">
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl text-deep-teal">Real talk. <br /><span className="text-orange italic">Every Wednesday.</span></h3>
                  <p className="text-lg md:text-xl text-teal/70 leading-relaxed">
                    Join the LifLearning Newsletter — free weekly tips on money, life skills, and the adulting stuff school skipped.
                  </p>
                </div>

                <div className="space-y-6">
                  <form 
                    action="https://app.kit.com/forms/9379236/subscriptions" 
                    className="flex flex-col gap-3" 
                    method="post"
                  >
                    <input 
                      type="email" 
                      name="email_address" 
                      placeholder="Your email address" 
                      required 
                      className="px-6 py-4 rounded-2xl bg-white text-deep-teal border border-teal/10 focus:outline-none focus:ring-4 focus:ring-orange/20"
                    />
                    <button 
                      className="bg-orange text-cream px-10 py-4 rounded-2xl font-bold hover:bg-orange/90 transition-all shadow-xl shadow-orange/20 text-xl"
                    >
                      I'm In
                    </button>
                  </form>
                  <button 
                    onClick={dismissPopup}
                    className="text-teal/40 hover:text-deep-teal font-medium transition-colors"
                  >
                    No thanks, I've got it figured out.
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-deep-teal text-cream py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6 md:col-span-2">
            <div className="text-3xl font-display font-bold">
              Lif<span className="text-orange">Learning</span>
            </div>
            <p className="text-cream/60 max-w-xs leading-relaxed text-lg">
              Empowering the next generation to bridge the gap and live intentionally.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange transition-colors"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange transition-colors"><Twitter size={20} /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-orange tracking-widest uppercase text-sm">Navigation</h4>
            <ul className="space-y-4 text-cream/70">
              <li><button onClick={() => toggleView('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => toggleView('lifcourses')} className="hover:text-white">LifCourses</button></li>
              <li><button onClick={() => toggleView('lifcoaching')} className="hover:text-white">LifCoaching</button></li>
              <li><button onClick={() => toggleView('resources')} className="hover:text-white">Resources</button></li>
              <li><button onClick={() => toggleView('blog')} className="hover:text-white">The Blog</button></li>
              <li><button onClick={() => toggleView('newsletter')} className="hover:text-white">Newsletter</button></li>
              <li><button onClick={() => toggleView('about')} className="hover:text-white">About</button></li>
              <li><button onClick={() => toggleView('faq')} className="hover:text-white">FAQ</button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-orange tracking-widest uppercase text-sm">Connect</h4>
            <ul className="space-y-4 text-cream/70">
              <li><a href="mailto:hello@liflearning.com" className="hover:text-white">hello@liflearning.com</a></li>
              <li><a href="#" className="hover:text-white">Newsletter</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-cream/30 text-sm">
          &copy; {new Date().getFullYear()} LifLearning. All rights reserved. Built with love (and grit).
        </div>
      </footer>
    </div>
  );
}
