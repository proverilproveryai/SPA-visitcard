// Данные портфолио


// Работы:
// --- Генеративная графика (пара патчей на p5js): dighering-фильтр
// --- Live AR сет
// --- Виджеинг на Tryptic
// --- super-collider патч

// - прикрутить ссылок к каждой работе по возможности

const portfolioData = {
    works: [
        {
            id: 1,
            title: "Интерактивная инсталляция на фестивале «МИКС»",
            images: [  
                "assets/images/works/1_miks/IMG_8689-8.jpg",
                "assets/images/works/1_miks/IMG_8442-23.jpg",
                "assets/images/works/1_miks/IMG_8269-28.jpg",
            ],
            description: `Фестиваль электронной музыки «МИКС» (Музыкальная индустрия в креативных сферах), организованный при грантовой поддержке Министерства культуры Воронежской области. В рамках фестиваля мне посчастливилось создать одну из инсталляций, служащей чем-то вроде входной группы.<br/><br/>Три секции с аналоговыми музыкальными инструментами: ударные (Roland TR-8), басс (Behringer TD 3) и синтезаторы. Под каждую секцию отведён свой проектор. Проецируемая анимация аудиореактивна, для каждой из них созданы свои патчи с графикой в Touchdesigner.`,
            tags: ["TouchDesigner", "Audioreactive", "Interactive", "VJ"]
        },
        {
            id: 2,
            title: "Интерактивные и световые объекты для клуба Plato",
            images: [  
                "assets/images/works/2_plato/teleky_v2.gif",
                "assets/images/works/2_plato/2-teleks.png",
                "assets/images/works/2_plato/2-plato.jpg"
            ],
            description: "Plato - воронежский андерграундный клуб, место концентрации субкульур. Здесь играли молодые диджеи, сводившие даб-техно с электро, хардкором и другой электроникой.<br/><br/>В рамках работы клуба я занимался световым сопровождением, а также сделал несколько интерактивных инсталляций: видеостену из старых телевизоров и переделанный gambling-автомат под ретро-гейминг с парой джойстиков. Увидеть телеки в действии, кстати, можно <a href='https://www.youtube.com/live/6dFMQyy6ZNo?feature=share'>здесь</a>.",
            tags: ["Analog", "Arduino", "Light"]
        },
        {
            id: 3,
            title: "Интерактивные стенды для экспозиции во дворце Ольденбургских",
            images: [  
                "assets/images/works/3_oldenburgs/3_microscope.jpeg",
                "assets/images/works/3_oldenburgs/3_svekla.jpeg",
                "assets/images/works/3_oldenburgs/3_1ww.jpg"
            ],
            description: "Дворец Ольденбургских - в настоящее время образец неоготики и музейный комплекс под Воронежем (Рамонь). <br/><br/>В рамках создания экспозиции «Во благо отечества» принимал активное участие в разработке интерактивных стендов на всех этапах: от идеи до реализации. Про саму экспозицию можно почитать <a href='https://zaprirodu.com/exposition-for-good-of-fatherland'>здесь</a>.",
            tags: ["Arduino", "SketchUp", "AutoCAD"]
        },
        {
            id: 4,
            title: "Увереное владение Touchdesigner",
            images: [  
                "assets/images/works/4_vjtool/4_animation.gif",
                "assets/images/works/4_vjtool/4_vjworks.gif",
                "assets/images/works/4_vjtool/4_main.png",
                "assets/images/works/4_vjtool/4_main2.png",
            ],
            description: "В ходе работы над разного рода интерактивом, любой относительно опытный пользователь Touchdesigner начинает суммировать свои best practicies. <br/><br/>Конкретно под виджеинг мной полностью с нуля был разработан проект, включающий в себя удобный и понятный интерфейс, контейнеры с возможностью добавления собственных генеративных патчей и фильтров, а также возможностью модулировать любой параметр от LFO, аудиоанализатора или tap tempo values.<br/><br/>Посмотреть мои vj-работы можно, например, <a href='https://t.me/proveril_proveryai/219'>здесь.",
            tags: ["Touchdesigner", "VHS", "Development"]
        },
                {
            id: 5,
            title: "Работа с генеративной графикой",
            images: [  
                "assets/images/works/5_genart/5_voronka.gif",
                "assets/images/works/5_genart/5_dithering.jpg",
                "assets/images/works/5_genart/5_shashki.jpg",
                "assets/images/works/5_genart/5_rotator.jpg",
                "assets/images/works/5_genart/5_buspattern.jpg",
            ],
            description: "Алгоритмические подходы к созданию графики - моя страсть. Также стремлюсь разрабатывать максимально оптимизированные решения, поддерживаемые любыми устройствами. Если говорить про web, то использую p5js преимущественно для 2d, GLSL - для текстурных паттернов, cables.gl - для создания web-проектов, объединяющих в себе множество фреймворков и подходов. Также активно балуюсь p5.sound и SuperCollider для работы со звуком.",
            tags: ["p5.js", "GLSL", "cables.gl", "SuperCollider"]
        }
    ],
    
    about: {
        title: "О себе",
        shortBio: "Медиа-инженер, дизайнер, creative technologist",
        fullBio: "Дизайнер по образованию с широким опытом в полиграфии и цифровых медиа. Специализируюсь на генеративной графике, интерактивных инсталляциях и аудиовизуальных перформансах.",
        experience: "28+ лет в креативной индустрии",
        projects: "50+ реализованных проектов"
    },
    
    contacts: {
        email: "your@email.com",
        telegram: "username",
        instagram: "username", 
        phone: "+79991234567"
    },
    
    skills: {
        technical: [
            "TouchDesigner",
            "p5.js / Processing",
            "GLSL Shaders",
            "Arduino / Raspberry Pi",
            "React / TypeScript",
            "Node.js"
        ],
        creative: [
            "Генеративная графика",
            "VJ / Live visuals",
            "3D-прототипирование",
            "Полиграфический дизайн",
            "Фотообработка",
            "UI/UX дизайн"
        ]
    }
};