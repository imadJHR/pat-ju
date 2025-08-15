export interface BlogPost {
  id: number
  slug: string
  title: {
    en: string
    fr: string
    ar: string
  }
  excerpt: {
    en: string
    fr: string
    ar: string
  }
  content: {
    en: string
    fr: string
    ar: string
  }
  category: string
  author: string
  date: string
  image: string
  readTime: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "art-making-perfect-chebakia",
    title: {
      en: "The Art of Making Perfect Chebakia",
      fr: "L'Art de Faire des Chebakia Parfaites",
      ar: "فن صنع الشباكية المثالية",
    },
    excerpt: {
      en: "Learn the traditional techniques passed down through generations to create these honey-soaked delicacies.",
      fr: "Apprenez les techniques traditionnelles transmises de génération en génération pour créer ces délices au miel.",
      ar: "تعلم التقنيات التقليدية المتوارثة عبر الأجيال لصنع هذه الحلويات المغموسة بالعسل.",
    },
    content: {
      en: `
        <h2>The History of Chebakia</h2>
        <p>Chebakia, also known as "griwech" in some regions of Morocco, is one of the most beloved traditional pastries in Moroccan cuisine. These intricate, flower-shaped treats have been gracing Moroccan tables for centuries, particularly during the holy month of Ramadan.</p>
        
        <h2>Essential Ingredients</h2>
        <p>The magic of chebakia lies in its simple yet perfectly balanced ingredients:</p>
        <ul>
          <li>High-quality flour</li>
          <li>Fresh eggs</li>
          <li>Orange blossom water</li>
          <li>Saffron threads</li>
          <li>Pure honey</li>
          <li>Sesame seeds</li>
        </ul>
        
        <h2>The Traditional Method</h2>
        <p>Creating perfect chebakia requires patience and skill. The dough must be rolled paper-thin, then carefully shaped into the characteristic flower pattern. Each piece is then deep-fried until golden and immediately dipped in warm honey infused with orange blossom water.</p>
        
        <h2>Tips for Success</h2>
        <p>The key to perfect chebakia is maintaining the right oil temperature and working quickly with the honey coating. The pastries should be crispy on the outside while maintaining a delicate texture within.</p>
      `,
      fr: `
        <h2>L'Histoire des Chebakia</h2>
        <p>Les chebakia, également connues sous le nom de "griwech" dans certaines régions du Maroc, sont l'une des pâtisseries traditionnelles les plus appréciées de la cuisine marocaine. Ces délices complexes en forme de fleur ornent les tables marocaines depuis des siècles, particulièrement pendant le mois sacré du Ramadan.</p>
        
        <h2>Ingrédients Essentiels</h2>
        <p>La magie des chebakia réside dans ses ingrédients simples mais parfaitement équilibrés :</p>
        <ul>
          <li>Farine de haute qualité</li>
          <li>Œufs frais</li>
          <li>Eau de fleur d'oranger</li>
          <li>Filaments de safran</li>
          <li>Miel pur</li>
          <li>Graines de sésame</li>
        </ul>
        
        <h2>La Méthode Traditionnelle</h2>
        <p>Créer des chebakia parfaites nécessite patience et habileté. La pâte doit être étalée très finement, puis soigneusement façonnée selon le motif floral caractéristique. Chaque pièce est ensuite frite jusqu'à ce qu'elle soit dorée et immédiatement trempée dans du miel chaud infusé à l'eau de fleur d'oranger.</p>
        
        <h2>Conseils pour Réussir</h2>
        <p>La clé des chebakia parfaites est de maintenir la bonne température d'huile et de travailler rapidement avec l'enrobage au miel. Les pâtisseries doivent être croustillantes à l'extérieur tout en conservant une texture délicate à l'intérieur.</p>
      `,
      ar: `
        <h2>تاريخ الشباكية</h2>
        <p>الشباكية، المعروفة أيضاً باسم "القريوش" في بعض مناطق المغرب، هي واحدة من أكثر الحلويات التقليدية المحبوبة في المطبخ المغربي. هذه الحلويات المعقدة على شكل زهرة تزين الموائد المغربية منذ قرون، خاصة خلال شهر رمضان المبارك.</p>
        
        <h2>المكونات الأساسية</h2>
        <p>سحر الشباكية يكمن في مكوناتها البسيطة والمتوازنة تماماً:</p>
        <ul>
          <li>دقيق عالي الجودة</li>
          <li>بيض طازج</li>
          <li>ماء زهر البرتقال</li>
          <li>خيوط الزعفران</li>
          <li>عسل نقي</li>
          <li>بذور السمسم</li>
        </ul>
        
        <h2>الطريقة التقليدية</h2>
        <p>صنع الشباكية المثالية يتطلب الصبر والمهارة. يجب رق العجين رقيقاً جداً، ثم تشكيله بعناية وفقاً للنمط الزهري المميز. كل قطعة تُقلى حتى تصبح ذهبية ثم تُغمس فوراً في العسل الدافئ المنقوع بماء زهر البرتقال.</p>
        
        <h2>نصائح للنجاح</h2>
        <p>مفتاح الشباكية المثالية هو الحفاظ على درجة حرارة الزيت المناسبة والعمل بسرعة مع طلاء العسل. يجب أن تكون الحلويات مقرمشة من الخارج مع الحفاظ على قوام رقيق من الداخل.</p>
      `,
    },
    category: "recipes",
    author: "Fatima Al-Zahra",
    date: "2024-01-15",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "5 min",
    tags: ["chebakia", "traditional", "ramadan", "honey", "moroccan-sweets"],
  },
  {
    id: 2,
    slug: "moroccan-tea-culture-pastries",
    title: {
      en: "Moroccan Tea Culture and Pastries",
      fr: "Culture du Thé Marocain et Pâtisseries",
      ar: "ثقافة الشاي المغربي والحلويات",
    },
    excerpt: {
      en: "Discover how traditional Moroccan pastries complement the ritual of tea drinking in Moroccan culture.",
      fr: "Découvrez comment les pâtisseries marocaines traditionnelles complètent le rituel du thé dans la culture marocaine.",
      ar: "اكتشف كيف تكمل الحلويات المغربية التقليدية طقوس شرب الشاي في الثقافة المغربية.",
    },
    content: {
      en: `
        <h2>The Sacred Ritual of Moroccan Tea</h2>
        <p>In Morocco, tea is more than just a beverage—it's a sacred ritual that brings families and communities together. The preparation and serving of mint tea, known as "atay," is an art form that has been perfected over generations.</p>
        
        <h2>Perfect Pastry Pairings</h2>
        <p>Traditional Moroccan pastries are specifically designed to complement the strong, sweet flavor of mint tea:</p>
        <ul>
          <li><strong>Gazelle Horns (Cornes de Gazelle):</strong> Delicate almond-filled crescents</li>
          <li><strong>Makroudh:</strong> Semolina pastries filled with dates</li>
          <li><strong>Briouats:</strong> Crispy triangular pastries with various fillings</li>
          <li><strong>Ma'amoul:</strong> Buttery cookies filled with nuts or dates</li>
        </ul>
        
        <h2>The Art of Hospitality</h2>
        <p>Serving tea with pastries is a cornerstone of Moroccan hospitality. Guests are always welcomed with this traditional offering, and refusing is considered impolite. The host takes great pride in presenting an array of homemade sweets alongside perfectly brewed tea.</p>
        
        <h2>Seasonal Variations</h2>
        <p>Different pastries are favored during different seasons and occasions. During Ramadan, honey-soaked pastries like chebakia are preferred, while during celebrations, more elaborate sweets like kaab ghzal take center stage.</p>
      `,
      fr: `
        <h2>Le Rituel Sacré du Thé Marocain</h2>
        <p>Au Maroc, le thé est plus qu'une simple boisson—c'est un rituel sacré qui rassemble les familles et les communautés. La préparation et le service du thé à la menthe, connu sous le nom d'"atay", est un art qui s'est perfectionné au fil des générations.</p>
        
        <h2>Accords Parfaits avec les Pâtisseries</h2>
        <p>Les pâtisseries marocaines traditionnelles sont spécifiquement conçues pour compléter la saveur forte et sucrée du thé à la menthe :</p>
        <ul>
          <li><strong>Cornes de Gazelle :</strong> Délicats croissants fourrés aux amandes</li>
          <li><strong>Makroudh :</strong> Pâtisseries de semoule fourrées aux dattes</li>
          <li><strong>Briouats :</strong> Pâtisseries triangulaires croustillantes avec diverses garnitures</li>
          <li><strong>Ma'amoul :</strong> Biscuits beurrés fourrés aux noix ou aux dattes</li>
        </ul>
        
        <h2>L'Art de l'Hospitalité</h2>
        <p>Servir le thé avec des pâtisseries est une pierre angulaire de l'hospitalité marocaine. Les invités sont toujours accueillis avec cette offrande traditionnelle, et refuser est considéré comme impoli. L'hôte tire une grande fierté de présenter un assortiment de douceurs faites maison aux côtés d'un thé parfaitement infusé.</p>
        
        <h2>Variations Saisonnières</h2>
        <p>Différentes pâtisseries sont privilégiées selon les saisons et les occasions. Pendant le Ramadan, les pâtisseries au miel comme les chebakia sont préférées, tandis que lors des célébrations, des douceurs plus élaborées comme les kaab ghzal prennent la vedette.</p>
      `,
      ar: `
        <h2>الطقوس المقدسة للشاي المغربي</h2>
        <p>في المغرب، الشاي أكثر من مجرد مشروب—إنه طقس مقدس يجمع العائلات والمجتمعات معاً. تحضير وتقديم الشاي بالنعناع، المعروف باسم "أتاي"، هو فن تم إتقانه عبر الأجيال.</p>
        
        <h2>التوافق المثالي مع الحلويات</h2>
        <p>الحلويات المغربية التقليدية مصممة خصيصاً لتكمل النكهة القوية والحلوة للشاي بالنعناع:</p>
        <ul>
          <li><strong>قرون الغزال:</strong> هلال رقيق محشو باللوز</li>
          <li><strong>المقروض:</strong> حلويات السميد المحشوة بالتمر</li>
          <li><strong>البريوات:</strong> حلويات مثلثية مقرمشة بحشوات متنوعة</li>
          <li><strong>المعمول:</strong> بسكويت بالزبدة محشو بالمكسرات أو التمر</li>
        </ul>
        
        <h2>فن الضيافة</h2>
        <p>تقديم الشاي مع الحلويات هو حجر الزاوية في الضيافة المغربية. الضيوف يُستقبلون دائماً بهذا العرض التقليدي، والرفض يُعتبر غير مهذب. المضيف يفتخر بتقديم مجموعة من الحلويات المنزلية إلى جانب الشاي المحضر بإتقان.</p>
        
        <h2>التنويعات الموسمية</h2>
        <p>حلويات مختلفة تُفضل خلال مواسم ومناسبات مختلفة. خلال رمضان، الحلويات المغموسة بالعسل مثل الشباكية مفضلة، بينما خلال الاحتفالات، الحلويات الأكثر تفصيلاً مثل كعب الغزال تأخذ المركز الرئيسي.</p>
      `,
    },
    category: "traditions",
    author: "Ahmed Benali",
    date: "2024-01-10",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "7 min",
    tags: ["tea-culture", "hospitality", "traditions", "mint-tea", "moroccan-culture"],
  },
  {
    id: 3,
    slug: "seasonal-ingredients-moroccan-sweets",
    title: {
      en: "Seasonal Ingredients in Moroccan Sweets",
      fr: "Ingrédients Saisonniers dans les Douceurs Marocaines",
      ar: "المكونات الموسمية في الحلويات المغربية",
    },
    excerpt: {
      en: "Explore how different seasons influence the ingredients and flavors of traditional Moroccan pastries.",
      fr: "Explorez comment les différentes saisons influencent les ingrédients et saveurs des pâtisseries marocaines traditionnelles.",
      ar: "استكشف كيف تؤثر الفصول المختلفة على مكونات ونكهات الحلويات المغربية التقليدية.",
    },
    content: {
      en: `
        <h2>Spring: Fresh Beginnings</h2>
        <p>Spring in Morocco brings fresh almonds, orange blossoms, and the first harvest of roses. This is the perfect time for delicate pastries that celebrate renewal and freshness.</p>
        
        <h2>Summer: Abundant Harvests</h2>
        <p>The summer months provide an abundance of:</p>
        <ul>
          <li>Fresh figs and dates</li>
          <li>Aromatic herbs like mint and verbena</li>
          <li>Citrus fruits at their peak</li>
          <li>Fresh honey from mountain apiaries</li>
        </ul>
        
        <h2>Autumn: Rich Flavors</h2>
        <p>Autumn brings nuts, dried fruits, and warming spices. This is when traditional pastries become richer and more complex, preparing for the cooler months ahead.</p>
        
        <h2>Winter: Comfort and Warmth</h2>
        <p>Winter pastries focus on warming ingredients like cinnamon, ginger, and preserved fruits. These sweets provide comfort during the cooler months and are often served during family gatherings.</p>
        
        <h2>Preserving Traditions</h2>
        <p>Understanding seasonal ingredients helps preserve the authenticity of Moroccan pastry-making while ensuring the best possible flavors in every creation.</p>
      `,
      fr: `
        <h2>Printemps : Nouveaux Commencements</h2>
        <p>Le printemps au Maroc apporte des amandes fraîches, des fleurs d'oranger, et la première récolte de roses. C'est le moment parfait pour des pâtisseries délicates qui célèbrent le renouveau et la fraîcheur.</p>
        
        <h2>Été : Récoltes Abondantes</h2>
        <p>Les mois d'été fournissent une abondance de :</p>
        <ul>
          <li>Figues et dattes fraîches</li>
          <li>Herbes aromatiques comme la menthe et la verveine</li>
          <li>Agrumes à leur apogée</li>
          <li>Miel frais des ruchers de montagne</li>
        </ul>
        
        <h2>Automne : Saveurs Riches</h2>
        <p>L'automne apporte des noix, des fruits secs, et des épices réchauffantes. C'est quand les pâtisseries traditionnelles deviennent plus riches et complexes, se préparant pour les mois plus frais à venir.</p>
        
        <h2>Hiver : Confort et Chaleur</h2>
        <p>Les pâtisseries d'hiver se concentrent sur des ingrédients réchauffants comme la cannelle, le gingembre, et les fruits confits. Ces douceurs apportent du réconfort pendant les mois plus frais et sont souvent servies lors des rassemblements familiaux.</p>
        
        <h2>Préserver les Traditions</h2>
        <p>Comprendre les ingrédients saisonniers aide à préserver l'authenticité de la pâtisserie marocaine tout en assurant les meilleures saveurs possibles dans chaque création.</p>
      `,
      ar: `
        <h2>الربيع: بدايات جديدة</h2>
        <p>الربيع في المغرب يجلب اللوز الطازج وأزهار البرتقال وأول حصاد للورود. هذا هو الوقت المثالي للحلويات الرقيقة التي تحتفل بالتجديد والنضارة.</p>
        
        <h2>الصيف: حصاد وفير</h2>
        <p>أشهر الصيف توفر وفرة من:</p>
        <ul>
          <li>التين والتمر الطازج</li>
          <li>الأعشاب العطرة مثل النعناع واللويزة</li>
          <li>الحمضيات في أوج نضجها</li>
          <li>العسل الطازج من مناحل الجبال</li>
        </ul>
        
        <h2>الخريف: نكهات غنية</h2>
        <p>الخريف يجلب المكسرات والفواكه المجففة والتوابل الدافئة. هذا عندما تصبح الحلويات التقليدية أكثر ثراءً وتعقيداً، استعداداً للأشهر الباردة القادمة.</p>
        
        <h2>الشتاء: الراحة والدفء</h2>
        <p>حلويات الشتاء تركز على المكونات الدافئة مثل القرفة والزنجبيل والفواكه المحفوظة. هذه الحلويات توفر الراحة خلال الأشهر الباردة وغالباً ما تُقدم خلال التجمعات العائلية.</p>
        
        <h2>الحفاظ على التقاليد</h2>
        <p>فهم المكونات الموسمية يساعد في الحفاظ على أصالة صنع الحلويات المغربية مع ضمان أفضل النكهات الممكنة في كل إبداع.</p>
      `,
    },
    category: "tips",
    author: "Khadija Mansouri",
    date: "2024-01-05",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "6 min",
    tags: ["seasonal-ingredients", "traditional-methods", "moroccan-spices", "natural-ingredients"],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
