from app.models import User, Post, Comment, Like, db, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='User', email='demo@aa.io', password='password')

    akira = User(
        username='Akira', first_name='Akira', last_name='Tanaka', email='akira@aa.io', password='password')

    rohan = User(
        username='Rohan', first_name='Rohan', last_name='Patel', email='rohan@aa.io', password='password')

    isabella = User(username='isabella', first_name='Isabella',
                    last_name='Costa', email='isabella@aa.io', password='password')

    natasha = User(username="Natasha", first_name="Natasha",
                   last_name="Ivanova", email="natash@gmail.com", password="password")

    ethan = User(username="Ethan", first_name="Ethan", last_name="Smith",
                 email="esmith@gmail.com", password="password")

    db.session.add(demo)
    db.session.add(akira)
    db.session.add(rohan)
    db.session.add(isabella)
    db.session.add(natasha)
    db.session.add(ethan)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
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

    post12 = Post(
        user_id=6,
        post_content="This past summer, I decided to embark on a self-care weekend, and it was truly a breath of fresh air! I took a trip with my loved ones, and it was the perfect opportunity to unwind, reflect, and cherish some quality time with family. Being in such a beautiful setting, I felt a sense of peace and tranquility that I haven't experienced since my Crohn's Disease diagnosis six years ago.The journey has been filled with ups and downs, but moments like these remind me of the importance of self-care and taking time for ourselves amidst life's challenges. During this trip, I allowed myself to let go of worries, stress, and just be present in the moment. I'm also grateful for this moment of reflection as it reminds me of the incredible journey I've been through, including surviving a liver transplant. The strength and resilience I discovered throughout that experience have shaped my perspective on life and made me value each moment even more.I'm grateful for the opportunity to create lasting memories with my family and feel a renewed sense of inner peace. It's essential to take care of ourselves, both physically and emotionally, and this self-care weekend served as a powerful reminder of that.Let's all remember to prioritize self-care, find moments of serenity, and be there for ourselves, just as we are for others. Together, we can embrace the journey, finding strength and joy in every step. #SelfCareWeekend #Reflections #Gratitude #InnerPeace #CrohnsDiseaseWarrior #AutoimmuneLiverCirrhosis #LiverTransplantWarrior",
        image_url="https://res.cloudinary.com/teepublic/image/private/s--qPGybBFH--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_000000,e_outline:48/co_000000,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/t_watermark_lock/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1619691885/production/designs/21475771_0.jpg"

    )

    post11 = Post(
        user_id=5,
        post_content="I find that my daily gratitude practice is a crucial part of my well-being. I take time at the end of every day to reflect on what I'm grateful for. At least once a week, usually on Sundays or Fridays, I write a list in my journal of all things I'm thankful for and I let the list get as long as I want it to. Of course, I write down large things like my job and my family, but I also like to acknowledge small things. Sometimes I'm grateful that there was flavored coffee creamer at the office or that one of my plants sprouted a new leaf. I think it's important to be grateful for everything that contributes to the good in your life.",
        image_url="https://media.istockphoto.com/id/671571062/photo/morning-cup-of-coffee-on-wooden-table-at-sunrise.jpg?s=612x612&w=0&k=20&c=3VRBWZKTJJN6aYtlvzC8CNDFWPzkU5wYYR7CCEc56s4="

    )

    post10 = Post(
        user_id=4,
        post_content="I was diagnosed with AIH/PBC (Autoimmune Hepatitis/ Primary Biliary Cholangitis) crossover and Stage 3 liver fibrosis in September 2011 after 6 months of extreme fatigue. I became jaundiced and was sent to my primary care physician to find out why. It took 4 different physicians and 3 weeks of testing, including a liver biopsy, to come to a diagnosis. I was at the hospital getting blood drawn and/or seeing a specialist almost daily during that time. I was put on steroids and immunosuppressants to get the AIH under control first. After 2 years of normal LFTs, in May 2014, I was started on Ursodiol for PBC. My LFTs have remained in the normal range and my last biopsy showed a normal liver.When we get the diagnosis of a disease we have never heard of before, our first instinct is to go on the internet to see what we can find out. I did that, and scared myself half to death. My best advice is to go to reputable sources such as the ALF and Mayo Clinic, or ask your specialist for brochures. Also, support groups are helpful so you don’t feel so alone with rare disease diagnoses.",
        image_url="data:image/jpeg;base64,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"

    )

    post4 = Post(
        user_id=3,
        post_content="Tips for enjoying gluten & aiding its digestion! As long as you don't have a sensitivity to gluten, you can generally enjoy foods with gluten as part of a healthy diet. Still, since gluten can be tough for the body to digest, here are a few tips to help your body with foods containing gluten. Take digestive enzymes: Since it takes a while for the body to break down all the components of gluten, taking a digestive enzyme supplement with your meal can provide some extra assistance. In particular, enzymes from fungal organisms can start tackling food proteins while they're still in the stomach. Chew properly: Digestion starts in the mouth with saliva and proper chewing helping to break down the food we eat. Experts recommend chewing each bite of food 30-50 times before swallowing! Drink more water: Staying hydrated is of course great for your body in many ways, including, digestion. Try a healthy infused water recipe if you need a little inspiration. Try the elimination diet: If you're fighting a number of digestive symptoms, gluten may or may not be the culprit. One way to find out is the elimination diet. Start by taking one or two foods out of your diet at a time. Wait a few weeks and see if your symptoms improve. If they do… you've found the problem! For most people, eating gluten in moderation isn't a problem. But for others, it can cause painful symptoms (and, in the case of Celiac disease, intestinal damage. Listen to your gut on whether gluten can be a part of your healthy diet!",
        image_url="https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/12/bread-varieties-group-still-life-1296x728-header-1296x728.jpg?w=1155&h=1528"
    )

    post9 = Post(
        user_id=2,
        post_content="Don't Compare Yourself to Others: People may think they are being helpful when they say things like, 'Other people have it so much worse than you. Think about them and you'll realize your life isn't so bad.' Of course, that's often not helpful at all. It also might make you feel worse to think about how hard others' lives must be—or make you feel guilty for complaining. Do your best to avoid going down the comparison path. Remember that someone else's pain doesn't invalidate your own. #SelfComparison #BeEmpathetic #StayPositive",
        image_url="https://b1504755.smushcdn.com/1504755/wp-content/uploads/2020/07/CI-More-Than-Half-2020-scaled.jpg?lossy=2&strip=1&webp=1"
    )

    post8 = Post(
        user_id=6,
        post_content="Parenting can be tough, and it's even more challenging when a parent has MS. But it's important to remember that many people with MS have successfully raised healthy, happy, and well-adjusted children. Experts suggest being open with your child about your MS from the beginning. If your child is having trouble dealing with your MS, counseling or family therapy may be helpful. Above all, providing love and support can make a big difference. #MSparenting #familylove #healthylife",
        image_url="data:image/jpeg;base64,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"

    )

    post7 = Post(
        user_id=1,
        post_content="Hey, Facebook fam! Just wanted to let you all know that I'm finally escaping the daily grind and heading off to paradise for some much-needed R&R! Can't wait to soak up the sun, dip my toes in the crystal-clear waters, and enjoy some delicious tropical treats! I'll be disconnecting from the virtual world for a little while to fully immerse myself in the beauty of nature and make unforgettable memories with my loved ones. But don't worry, I'll be back with a bunch of amazing photos and stories to share! If you need me urgently, feel free to drop me a message, and I'll get back to you once I'm back online. To all my wanderlust buddies out there, any recommendations or must-visit spots on this dreamy island? Share your favorite travel experiences with me! I can't wait to explore and make the most of this adventure. Take care, stay awesome, and see you all in a bit! #VacationMode #TimeToUnwind #TravelDiaries #ParadiseCalling",
        image_url="https://t4.ftcdn.net/jpg/02/04/18/31/360_F_204183141_WZg7iaqOr8eZZDxYbLRA8iKt1aOsd8Gz.jpg"
    )
    post6 = Post(
        user_id=5,
        post_content="Supporting Each Other Through Illness: Facing illness can be tough, but the strength of a community can make all the difference! Let's come together to uplift and support those battling illnesses with love and compassion! Reach out to your friends and family who are facing health challenges. A simple message or call can brighten their day and show that they are not alone. Offer a helping hand to those in need. Whether it's running errands, cooking a meal, or just lending a listening ear, small gestures can make a big impact. Educate yourself and others about different health conditions. Understanding breeds empathy, and together, we can build a more compassionate society. Spread awareness about support networks, resources, and organizations that assist those with illnesses. Let's make sure no one has to face their health journey alone. Share stories of hope, recovery, and resilience to inspire others. Your experiences could provide strength to someone who needs it. Let's build a community that stands strong together, supporting and lifting each other up through the challenges of illness. #SupportEachOther #CommunityStrength #TogetherWeHeal",
        image_url="https://seattledizzygroup.files.wordpress.com/2019/08/chronic-illness-way-to-support-loved-one.jpg"
    )
    post5 = Post(
        user_id=1,
        post_content="In a world that celebrates uniqueness, let's take a moment to recognize and appreciate neuroatypical individuals. Neurodiversity is a beautiful aspect of human existence, enriching our communities with a wide range of perspectives and talents. To foster an inclusive environment, we must embrace neuroatypical individuals for their strengths and contributions. By raising awareness and understanding about different neurological conditions, we can break down barriers and reduce stigma. Empathy and compassion play crucial roles in supporting neuroatypical friends, family, and colleagues. Let's be patient listeners and allies. Today, we come together to celebrate the resilience and creativity of neuroatypical individuals, working towards a world that values diversity and embraces every mind. #Neuroatypical #InclusionMatters #EmbraceDifferences #NeurodiversityAwareness",
        image_url="https://www.verywellhealth.com/thmb/3TEKYIARUBBhcaC0_hp1ptq6OWk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/neurodivergent-5216749-DD-Final-777ac50f72ec4d98b74a937244744a14.jpg"
    )

    post4 = Post(
        user_id=3,
        post_content="My Cancer Journey: Advocating for More Research. Hey everyone, I wanted to share a personal part of my life that has profoundly impacted me: my battle with cancer. It hasn't been an easy road, but I've learned so much along the way. Today, I want to raise my voice and advocate for more cancer research. Cancer touches the lives of millions, and the toll it takes on patients, families, and friends is immeasurable. Throughout my journey, I've witnessed the importance of early detection, innovative treatments, and ongoing support. My advocating for more research, we can fuel advancements that bring hope to those facing this formidable disease. Together, we can improve the quality of life for cancer patients, enhance survivorship, and ultimately find a cure. I urge everyone to support organizations that fund research, raise awareness, and provide essential resources to those affected by cancer. Let's stand together and create a world where no one has to face this battle alone. To my fellow warriors, I want you to know that you are not alone. We are a community of strength and resilience. Let's continue fighting, sharing our stories, and advocating for a brighter future. Together, we can make a difference! Let's raise our voices and push for more research, support, and hope. #CancerAwareness #ResearchAdvocacy #TogetherWeFight #CancerSurvivor",
        image_url="https://www.canceredinstitute.org/uploads/2/3/8/8/23883109/edited/9d616749677bb1ec924ec6ceadb569cf.jpeg?1513262399"
    )

    post3 = Post(
        user_id=1,
        post_content="A few months ago, a serious car accident left me physically and emotionally broken. Determined to reclaim my life, I began a challenging journey to recovery and rehabilitation. Supported by family, friends, and healthcare professionals, I pushed through surgeries, therapy, and setbacks. Embracing patience, gratitude, and self-compassion, I found the power to heal both physically and emotionally. Today, I stand stronger than ever, a testament to perseverance. To those on a similar path, know you're not alone. Seek support, be patient, and believe in your ability to overcome. There's a light at the end of the tunnel. Embrace every step and rise strong from the ashes. #RecoveryJourney #RiseStrong #NeverGiveUp #CarAccidentSurvivor",
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz8wye1NtoE5Z3L0m_xLNwCZ6zxwgiKIj5sg&usqp=CAU"
    )

    post2 = Post(
        user_id=5,
        post_content="Living with an autoimmune disease has been a challenging journey for me. After struggling with chronic inflammation and its effects, I adopted an anti-inflammatory diet to take charge of my health. This dietary shift has had a positive impact on my life, and if you're seeking a natural way to manage autoimmune symptoms, consider these changes. At the core of my anti-inflammatory diet is a focus on whole, unprocessed foods—abundant vegetables, fruits, and leafy greens rich in antioxidants and phytonutrients that combat inflammation and support the immune system. Omega-3 fatty acids, sourced from wild-caught salmon, flaxseeds, chia seeds, and walnuts, have been game-changers for managing inflammation and promoting overall wellness. I've also limited processed sugars and refined carbohydrates, instead emphasizing whole grains like quinoa and brown rice to avoid blood sugar spikes. Incorporating spices like turmeric and ginger has proven beneficial due to their traditional use in reducing inflammation. Gut health is crucial for managing autoimmune conditions, so I include probiotic-rich foods like sauerkraut, kimchi, and yogurt to support a healthy gut microbiome, essential for proper immune function.Throughout my journey, I've learned the importance of personalization and mindful eating. Every person's experience with autoimmune disease is unique, so I listen to my body and adjust my diet accordingly. Embracing this anti-inflammatory diet has been transformative for my autoimmune disease journey. Wholesome, nourishing foods have given me better control over inflammation and improved my overall well-being. Remember, consult a healthcare professional or registered dietitian before making significant dietary changes, especially with an autoimmune condition. Together, let's nurture our bodies and take a step towards healing with the power of food.",
        image_url="https://pbs.twimg.com/media/C52v0vCXEAEqEle?format=jpg&name=4096x4096"
    )

    post1 = Post(
        user_id=1,
        post_content="How is everyone doing today?"
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
    db.session.add(post12)
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()


def seed_comments():

    comment1 = Comment(
        user_id=2,
        post_id=1,
        comment_content="Doing great today! Hope everyone has a fantastic day and wishing us all the strength and courage to fight our battles today."
    )

    comment2 = Comment(
        user_id=3,
        post_id=1,
        comment_content="Wonderful!!! "
    )
    comment3 = Comment(
        user_id=4,
        post_id=1,
        comment_content="Wishing us all health and happiness today!"
    )
    comment4 = Comment(
        user_id=5,
        post_id=2,
        comment_content="Thank you so much for sharing this!"
    )

    comment5 = Comment(
        user_id=1,
        post_id=2,
        comment_content="You are so strong and such an inspiration! "
    )
    comment6 = Comment(
        user_id=6,
        post_id=2,
        comment_content="Sending healing thoughts your way #staypositive #loveishealing #strengthtoyou"
    )
    comment7 = Comment(
        user_id=1,
        post_id=3,
        comment_content="I truly appreciate you sharing this information. It means a lot and I am grateful for your openness."
    )
    comment7 = Comment(
        user_id=2,
        post_id=3,
        comment_content="I am glad to hear that you are doing better! Your resilience and strength are truly inspiring."
    )
    comment8 = Comment(
        user_id=5,
        post_id=4,
        comment_content="My heart goes out to all those who are bravely fighting their battles. Please know that you are not alone, and I am sending positive and healing thoughts your way. Stay strong."
    )
    comment9 = Comment(
        user_id=4,
        post_id=5,
        comment_content="Thanks for spreading awareness on this important topic. My son is neuroatypical and I would love to see people being more mindful around him, especially at school! "
    )
    comment10 = Comment(
        user_id=2,
        post_id=6,
        comment_content="Great information! These are so true! Hope everyone who reads this shares it with their loved ones so they can learn how to best support their loved ones with chronic illnesses."
    )
    comment11 = Comment(
        user_id=4,
        post_id=7,
        comment_content="Have a wonderful vacation and don't forget to take plenty of pictures! Remember to take care of yourself. #SelfCare"
    )
    comment12 = Comment(
        user_id=5,
        post_id=8,
        comment_content="You are doing a great job! Your child is lucky to have a supportive and knowledgeable parent like you! Thanks for spreading awareness on MS"
    )
    comment13 = Comment(
        user_id=5,
        post_id=9,
        comment_content="This is so true! Comparison doesn't get us anywhere and we all experience illness differently. There is so much gaslighting in the healthcare industry nowadays and its so difficult to get a doctor to take us seriously and listen to our concerns. Thanks for sharing this!"
    )
    comment14 = Comment(
        user_id=1,
        post_id=10,
        comment_content="Thanks for sharing this with us. You are stronger than you imagine and a true warrior. It takes lots of resilience to keep fighting and you are absolutely right. Having a doctor that doesn't gaslight you and believes you is literally a matter of life and death. Have lost too many loved ones to medical negligence. Prayers for your"
    )
    comment15 = Comment(
        user_id=3,
        post_id=11,
        comment_content="What a great way to reflect and express gratitude for life everyday! I am inspired to do the same now- thanks for sharing!"
    )
    comment16 = Comment(
        user_id=2,
        post_id=12,
        comment_content="Thanks for sharing this with us!"
    )

    comment17 = Comment(
        user_id=4,
        post_id=12,
        comment_content="May you have all the strength, love, and healing you need. Take care!"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()


def seed_likes():

    like1 = Like(user_id=1, post_id=1, post_like=True, post_love=False)
    like2 = Like(user_id=2, post_id=2, post_like=True, post_love=False)
    like3 = Like(user_id=3, post_id=3, post_like=True, post_love=False)
    like4 = Like(user_id=4, post_id=4, post_like=True, post_love=False)
    like5 = Like(user_id=1, post_id=5, post_like=True, post_love=False)
    like6 = Like(user_id=2, post_id=6, post_like=True, post_love=False)
    like7 = Like(user_id=3, post_id=7, post_like=True, post_love=False)
    like8 = Like(user_id=4, post_id=8, post_like=True, post_love=False)
    like9 = Like(user_id=1, post_id=9, post_like=True, post_love=False)
    like10 = Like(user_id=2, post_id=10, post_like=True, post_love=False)
    like11 = Like(user_id=3, post_id=11, post_like=True, post_love=False)
    like12 = Like(user_id=4, post_id=1, post_like=True, post_love=False)
    like13 = Like(user_id=1, post_id=2, post_like=True, post_love=False)
    like14 = Like(user_id=2, post_id=3, post_like=True, post_love=False)

    db.session.add_all([like1, like2, like3, like4, like5, like6,
                       like7, like8, like9, like10, like11, like12, like13, like14])

    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
