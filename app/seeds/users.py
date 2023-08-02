from app.models import User, Post, Comment, Like, db, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='User',email='demo@aa.io', password='password')
    marnie = User(
        username='marnie',first_name='Marnie', last_name='Mills', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie',first_name='Bobbie', last_name='Mills', email='bobbie@aa.io', password='password')
    sally = User(username='sally',first_name='Sally', last_name='Marsh', email='sally@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sally)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

# POSTS SEED DATA:
#             'id': self.id,
#             'user_id': self.user_id,
#             'title': self.title,
#             'post_content': self.post_content,
#             'image_url': self.image_url,
#             'created_at': self.created_at,
def seed_posts():

    post1= Post(
        user_id=1,
        post_content="Took a self-care weekend and traveled this past summer. Had a great time reflecting and being there with my fam. Haven't felt peace like this since I was diagnosed with Crohn's Disease 6 years ago. ",
        image_url="https://www.turistafaidate.it/wp-content/uploads/2017/03/Bahamas-696x451.jpg"

    )


    post2= Post(
        user_id=2,
        post_content="I find that my daily gratitude practice is a crucial part of my well-being. I take time at the end of every day to reflect on what I'm grateful for. At least once a week, usually on Sundays or Fridays, I write a list in my journal of all things I'm thankful for and I let the list get as long as I want it to. Of course, I write down large things like my job and my family, but I also like to acknowledge small things. Sometimes I'm grateful that there was flavored coffee creamer at the office or that one of my plants sprouted a new leaf. I think it's important to be grateful for everything that contributes to the good in your life.",
        image_url="data:image/jpeg;base64,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"

    )

    post3= Post(
        user_id=3,
        post_content="I was diagnosed with AIH/PBC (Autoimmune Hepatitis/ Primary Biliary Cholangitis) crossover and Stage 3 liver fibrosis in September 2011 after 6 months of extreme fatigue. I became jaundiced and was sent to my primary care physician to find out why. It took 4 different physicians and 3 weeks of testing, including a liver biopsy, to come to a diagnosis. I was at the hospital getting blood drawn and/or seeing a specialist almost daily during that time. I was put on steroids and immunosuppressants to get the AIH under control first. After 2 years of normal LFTs, in May 2014, I was started on Ursodiol for PBC. My LFTs have remained in the normal range and my last biopsy showed a normal liver.When we get the diagnosis of a disease we have never heard of before, our first instinct is to go on the internet to see what we can find out. I did that, and scared myself half to death. My best advice is to go to reputable sources such as the ALF and Mayo Clinic, or ask your specialist for brochures. Also, support groups are helpful so you don’t feel so alone with rare disease diagnoses.",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"

    )

    post4 = Post(
        user_id=2,
        post_content="tips for enjoying gluten & aiding its digestion. As long as you don't have a sensitivity to gluten, you can generally enjoy foods with gluten as part of a healthy diet. Still, since gluten can be tough for the body to digest, here are a few tips to help your body with foods containing gluten. Take digestive enzymes: Since it takes a while for the body to break down all the components of gluten, taking a digestive enzyme supplement with your meal can provide some extra assistance. In particular, enzymes from fungal organisms can start tackling food proteins while they're still in the stomach. Chew properly: Digestion starts in the mouth with saliva and proper chewing helping to break down the food we eat. Experts recommend chewing each bite of food 30-50 times before swallowing! Drink more water: Staying hydrated is of course great for your body in many ways, including, digestion. Try a healthy infused water recipe if you need a little inspiration. Try the elimination diet: If you're fighting a number of digestive symptoms, gluten may or may not be the culprit. One way to find out is the elimination diet. Start by taking one or two foods out of your diet at a time. Wait a few weeks and see if your symptoms improve. If they do… you've found the problem! For most people, eating gluten in moderation isn't a problem. But for others, it can cause painful symptoms (and, in the case of Celiac disease, intestinal damage. Listen to your gut on whether gluten can be a part of your healthy diet!",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"
        )

    post5=Post(
        user_id=4,
        post_content="Don't Compare Yourself to Others: People may think they are being helpful when they say things like, 'Other people have it so much worse than you. Think about them and you'll realize your life isn't so bad.' Of course, that's often not helpful at all. It also might make you feel worse to think about how hard others' lives must be—or make you feel guilty for complaining. Do your best to avoid going down the comparison path. Remember that someone else's pain doesn't invalidate your own. #SelfComparison #BeEmpathetic #StayPositive",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"
        )

    post6 = Post(
        user_id=4,
        post_content="Parenting can be tough, and it's even more challenging when a parent has MS. But it's important to remember that many people with MS have successfully raised healthy, happy, and well-adjusted children. Experts suggest being open with your child about your MS from the beginning. If your child is having trouble dealing with your MS, counseling or family therapy may be helpful. Above all, providing love and support can make a big difference. #MSparenting #familylove #healthylife"

        )

    post7=Post(
        user_id=1,
        post_content="Hey, Facebook fam! Just wanted to let you all know that I'm finally escaping the daily grind and heading off to paradise for some much-needed R&R! Can't wait to soak up the sun, dip my toes in the crystal-clear waters, and enjoy some delicious tropical treats! I'll be disconnecting from the virtual world for a little while to fully immerse myself in the beauty of nature and make unforgettable memories with my loved ones. But don't worry, I'll be back with a bunch of amazing photos and stories to share! If you need me urgently, feel free to drop me a message, and I'll get back to you once I'm back online. To all my wanderlust buddies out there, any recommendations or must-visit spots on this dreamy island? Share your favorite travel experiences with me! I can't wait to explore and make the most of this adventure. Take care, stay awesome, and see you all in a bit! #VacationMode #TimeToUnwind #TravelDiaries #ParadiseCalling",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"
    )
    post8=Post(
        user_id=3,
        post_content="Supporting Each Other Through Illness: Facing illness can be tough, but the strength of a community can make all the difference! Let's come together to uplift and support those battling illnesses with love and compassion! Reach out to your friends and family who are facing health challenges. A simple message or call can brighten their day and show that they are not alone. Offer a helping hand to those in need. Whether it's running errands, cooking a meal, or just lending a listening ear, small gestures can make a big impact. Educate yourself and others about different health conditions. Understanding breeds empathy, and together, we can build a more compassionate society. Spread awareness about support networks, resources, and organizations that assist those with illnesses. Let's make sure no one has to face their health journey alone. Share stories of hope, recovery, and resilience to inspire others. Your experiences could provide strength to someone who needs it. Let's build a community that stands strong together, supporting and lifting each other up through the challenges of illness. #SupportEachOther #CommunityStrength #TogetherWeHeal",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"
    )
    post9=Post(
        user_id=2,
        post_content="In a world that celebrates uniqueness, let's take a moment to recognize and appreciate neuroatypical individuals. Neurodiversity is a beautiful aspect of human existence, enriching our communities with a wide range of perspectives and talents. To foster an inclusive environment, we must embrace neuroatypical individuals for their strengths and contributions. By raising awareness and understanding about different neurological conditions, we can break down barriers and reduce stigma. Empathy and compassion play crucial roles in supporting neuroatypical friends, family, and colleagues. Let's be patient listeners and allies. Today, we come together to celebrate the resilience and creativity of neuroatypical individuals, working towards a world that values diversity and embraces every mind. #Neuroatypical #InclusionMatters #EmbraceDifferences #NeurodiversityAwareness",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"
    )

    post10=Post(
        user_id=2,
        post_content="My Cancer Journey: Advocating for More Research. Hey everyone, I wanted to share a personal part of my life that has profoundly impacted me: my battle with cancer. It hasn't been an easy road, but I've learned so much along the way. Today, I want to raise my voice and advocate for more cancer research. Cancer touches the lives of millions, and the toll it takes on patients, families, and friends is immeasurable. Throughout my journey, I've witnessed the importance of early detection, innovative treatments, and ongoing support. My advocating for more research, we can fuel advancements that bring hope to those facing this formidable disease. Together, we can improve the quality of life for cancer patients, enhance survivorship, and ultimately find a cure. I urge everyone to support organizations that fund research, raise awareness, and provide essential resources to those affected by cancer. Let's stand together and create a world where no one has to face this battle alone. To my fellow warriors, I want you to know that you are not alone. We are a community of strength and resilience. Let's continue fighting, sharing our stories, and advocating for a brighter future. Together, we can make a difference! Let's raise our voices and push for more research, support, and hope. #CancerAwareness #ResearchAdvocacy #TogetherWeFight #CancerSurvivor",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"
    )

    post11=Post(
        user_id=1,
        post_content="Living with an autoimmune disease has been a challenging journey for me. After struggling with chronic inflammation and its effects, I adopted an anti-inflammatory diet to take charge of my health. This dietary shift has had a positive impact on my life, and if you're seeking a natural way to manage autoimmune symptoms, consider these changes. At the core of my anti-inflammatory diet is a focus on whole, unprocessed foods—abundant vegetables, fruits, and leafy greens rich in antioxidants and phytonutrients that combat inflammation and support the immune system. Omega-3 fatty acids, sourced from wild-caught salmon, flaxseeds, chia seeds, and walnuts, have been game-changers for managing inflammation and promoting overall wellness. I've also limited processed sugars and refined carbohydrates, instead emphasizing whole grains like quinoa and brown rice to avoid blood sugar spikes. Incorporating spices like turmeric and ginger has proven beneficial due to their traditional use in reducing inflammation. Gut health is crucial for managing autoimmune conditions, so I include probiotic-rich foods like sauerkraut, kimchi, and yogurt to support a healthy gut microbiome, essential for proper immune function.Throughout my journey, I've learned the importance of personalization and mindful eating. Every person's experience with autoimmune disease is unique, so I listen to my body and adjust my diet accordingly. Embracing this anti-inflammatory diet has been transformative for my autoimmune disease journey. Wholesome, nourishing foods have given me better control over inflammation and improved my overall well-being. Remember, consult a healthcare professional or registered dietitian before making significant dietary changes, especially with an autoimmune condition. Together, let's nurture our bodies and take a step towards healing with the power of food.",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"
    )

    post12=Post(
        user_id=3,
        post_content="A few months ago, a serious car accident left me physically and emotionally broken. Determined to reclaim my life, I began a challenging journey to recovery and rehabilitation. Supported by family, friends, and healthcare professionals, I pushed through surgeries, therapy, and setbacks. Embracing patience, gratitude, and self-compassion, I found the power to heal both physically and emotionally. Today, I stand stronger than ever, a testament to perseverance. To those on a similar path, know you're not alone. Seek support, be patient, and believe in your ability to overcome. There's a light at the end of the tunnel. Embrace every step and rise strong from the ashes. #RecoveryJourney #RiseStrong #NeverGiveUp #CarAccidentSurvivor",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2mqneo_E-cItRm6RaqnYAdio5Bl2JdxxZQ&usqp=CAU"
    )



    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)

    db.session.commit()



def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()



def seed_comments():

    comment1=Comment(
        user_id=1,
        post_id=1,
        comment_content="Thank you for sharing"
    )

    comment2=Comment(
        user_id=2,
        post_id=1,
        comment_content="Wonderful"
    )
    comment3=Comment(
        user_id=3,
        post_id=1,
        comment_content="Sending healing thoughts your way"
    )
    comment4=Comment(
        user_id=2,
        post_id=2,
        comment_content="Thank you for sharing!"
    )

    comment5=Comment(
        user_id=1,
        post_id=3,
        comment_content="Good information, thank you for sharing with us"
    )
    comment6=Comment(
        user_id=3,
        post_id=2,
        comment_content="love the advice!!!"
    )
    comment7=Comment(
        user_id=1,
        post_id=5,
        comment_content="Thanks for sharing this"
    )
    comment7=Comment(
        user_id=4,
        post_id=6,
        comment_content="Yes, I can totally relate to this!"
    )



    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()


def seed_likes():

    like1=Like(user_id=1,post_id=2,post_like=True,post_love=False)
    like2=Like(user_id=2,post_id=3,post_like=True,post_love=False)
    like3=Like(user_id=3,post_id=1,post_like=True,post_love=False)
    like4=Like(user_id=2,post_id=1,post_like=True,post_love=False)
    like5=Like(user_id=3,post_id=2,post_like=True,post_love=False)
    like6=Like(user_id=1,post_id=3,post_like=True,post_love=False)
    like7 = Like(user_id=1, post_id=4, post_like=True, post_love=False)
    like8 = Like(user_id=2, post_id=5, post_like=True, post_love=False)
    like9 = Like(user_id=3, post_id=6, post_like=True, post_love=False)
    like10 = Like(user_id=3, post_id=6, post_like=True, post_love=False)
    db.session.add_all([like1, like2, like3, like4, like5, like6, like7, like8, like9, like10])

    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
