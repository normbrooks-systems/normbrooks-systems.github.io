####Local LLMs are not Ready for Prime Time
##Written on Thursday, May 7, 2026
##By Norm Brooks

I read an [article by Yash Patel](https://www.xda-developers.com/real-bottleneck-of-self-hosted-llm-stack-is-not-gpu/) published yesterday evening, singing hosannas about how grand local LLMs are and how they could create massive value for a user, if they were just willing to give the model more context. While I don’t deny that they have uses, the author argued for giving the LLM broad control and integrations in Home Assistant; I find that to be a bit professionally concerning.

In fact, I could scarcely believe my eyes, what I was reading. Not because someone would trust an AI for such a task, but that someone would trust any automated system without having some kind of oversight step. To me, that’s like using a chainsaw while wearing shorts and having no goggles or protection anywhere from flying debris.

AI—even the largest, most powerful frontier models—does not have the context windows to be trusted with that kind of integration. Not yet, anyway. The space is evolving, and it’s possible in 5 years I’ll be eating my hat. But right now? You’re foolish if you give AI that kind of control without verifying what you’re giving it access to.

People in general are treating this technology as if it’s some kind of wundertech, without understanding the limitations. In much the same way as grain threshers were highly dangerous when they were first introduced, AI has many of the same issues. An example of this would be if you gave AI control over an HVAC system, and you told it to keep the temperature above a certain level if it detected humans in the room. It might hallucinate sensor activity and activate the climate control. More concerningly, it might add temperatures and force a unit to maximum power instead of choosing something more reasonable for the outdoor climate.

God forbid if this LLM had access to financial information for automated reordering. I’ve worked around automated systems for most of my adult life and I will happily tell you that I would not trust anything digitally automated unless I can verify the data before it left my device—failure modes range from annoying to catastrophic when you start looking at anything monetary. Could you imagine a hallucinated low-stock order going out daily, and you aren’t noticing until you start getting daily shipments of laundry detergent?

Chatbots are the ultimate compiler using natural language as a programming interface. You tell a chatbot to do something, and if you are precise and descriptive enough, you wind up with something that comes out the other side that you either can use directly, or can modify slightly to get what you’re looking for.

One thing I must point out is that when you give an AI a task, you’re not trusting a competent system—you’re trusting a computer program that’s been coded in a specific way to allow it the ability to make decisions based upon natural language. You need to remember that this system can’t remember what’s going on from one session to the next, and any time you give it context, it needs to reload that context. Local LLMs in particular have very limited windows to work with.

You’re better off treating these programs as dementia patients—they can absolutely be given things to do, but anything of consequence needs to be checked to ensure it’s a proper, well defined decision. They are capable of holding increasingly interesting conversations, but not always capable of remembering what’s going on from one day to the next. You might have the LLM configured properly one day, and then the next, you’ll have to fix the prompt or change the data the LLM has access to.

Don’t get me wrong—these are powerful tools, but we wear safety glasses when using chainsaws for a reason.
