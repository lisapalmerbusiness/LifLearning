/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Wallet, 
  Briefcase, 
  Heart, 
  ArrowRight,
  CheckCircle2,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

type View = 'home' | 'about';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleView = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <button 
              onClick={() => toggleView('about')}
              className={`hover:text-orange transition-colors ${currentView === 'about' ? 'text-orange underline underline-offset-8' : 'text-teal'}`}
              id="nav-about"
            >
              About
            </button>
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
              className="md:hidden absolute top-20 left-0 right-0 bg-cream border-b border-teal/10 p-6 flex flex-col gap-6"
              id="mobile-menu"
            >
              <button 
                onClick={() => toggleView('home')}
                className={`text-xl font-medium ${currentView === 'home' ? 'text-orange' : 'text-teal'}`}
              >
                Home
              </button>
              <button 
                onClick={() => toggleView('about')}
                className={`text-xl font-medium ${currentView === 'about' ? 'text-orange' : 'text-teal'}`}
              >
                About
              </button>
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
          {currentView === 'home' ? (
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
          ) : (
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
        </AnimatePresence>
      </main>

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
              <li><button onClick={() => toggleView('about')} className="hover:text-white">About</button></li>
              <li><a href="#" className="hover:text-white">The Blog</a></li>
              <li><a href="#" className="hover:text-white">Resources</a></li>
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
