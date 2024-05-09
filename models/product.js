const products = ['translation', 'market', 'programming', 'learning', 'fitness', 'writing']

const data = {
    translation: {
        name: 'Tradução de Línguas',
        icon: 'abracadabra',
        data: {
            images: [], // Por ordem, de cima para baixo da esquerda para direita
            popular: {
                title: 'Traduções mais populares',
                elements: [ // 3 elementos
                    {
                        id: 'english',
                        name: 'Inglês',
                        icon: ''
                    },
                    {
                        id: 'english',
                        name: 'Inglês',
                        icon: ''
                    },
                    {
                        id: 'english',
                        name: 'Inglês',
                        icon: ''
                    },
                ],
            },
            explore: {
                title: 'Explorar Traduções',
                elements: [
                    {
                        id: 'english',
                        name: 'Inglês',
                        image: ''
                    },
                    {
                        id: 'spanish',
                        name: 'Espanhol',
                        image: ''
                    },
                    {
                        id: 'french',
                        name: 'Francês',
                        image: ''
                    },
                    {
                        id: 'german',
                        name: 'Alemão',
                        image: ''
                    },
                    {
                        id: 'mandarin',
                        name: 'Mandarim',
                        image: ''
                    },
                    {
                        id: 'russian',
                        name: 'Russo',
                        image: ''
                    },
                    {
                        id: 'arabic',
                        name: 'Árabe',
                        image: ''
                    },
                    {
                        id: 'hindi',
                        name: 'Hindi',
                        image: ''
                    }
                ]
            } 
        },
        resume: {
            left: {
                question: 'Você tem um documento importante que precisa ser traduzido com precisão e profissionalismo?',
                answer: 'Nao sei o que escrever'
            },
            right: {
                question: 'Por que escolher nossos serviços de tradução?',
                topics: [
                    'Expertise Diversificada',
                    'Qualidade Garantida',
                    'Prazos Cumpridos',
                    'Comunicação Transparente'
                ]
            }
        },
        hiw: { // how it works
            first: {
                title: '1. Envie seu documento',
                description: 'Envie o documento que deseja traduzir para nossa equipe de especialistas.'
            },
        },
        faq: [
            {
                question: 'Como posso ter a certeza que o meu documento será bem traduzido?',
                answer: 'Blablasldalsd'
            },
            {
                question: 'Quanto tempo demora para traduzir um documento?',
                answer: 'Blablasldalsd'
            },
        ]
    },
    market: {},
    programming: {},
    learning: {},
    fitness: {},
    writing: {}
}

export function getProducts() {
    return data
}

export function getGeneralProductsData(){
    let res = {}
    for (let product of products){
        if (!data[product]) continue;
        res[product] = {
            name: data[product]?.name,
            icon: data[product]?.icon
        }
    }
    return res
}

export function getProduct(id) {
    return data[id]
}