export const pointTypes = () => ([
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
]);

export const complexPointTypes = () => ([
  {
    type: 'taxi',
    offers: []
  },
  {
    type: 'bus',
    offers: []
  },
  {
    type: 'train',
    offers: [
      {
        name: 'Выбрать место',
        price: 20,
        isChosen: false,
        type: 'luggage'
      },
      {
        name: 'Горячий обед',
        price: 30,
        isChosen: false,
        type: 'lunch'
      },
      {
        name: 'Спальное купе',
        price: 100,
        isChosen: false,
        type: 'sleep'
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        name: 'Выбрать номер',
        price: 40,
        isChosen: false,
        type: 'luggage'
      },
      {
        name: 'Питание в ресторане',
        price: 800,
        isChosen: false,
        type: 'restaurant'
      },
      {
        name: 'SPA-процедуры',
        price: 1200,
        isChosen: false,
        type: 'spa'
      },
      {
        name: 'Повысить класс номера',
        price: 400,
        isChosen: false,
        type: 'rank'
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        name: 'Аренда каршеринга',
        price: 250,
        isChosen: false,
        type: 'car-sharing'
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        name: 'Выбрать место',
        price: 40,
        isChosen: false,
        type: 'chose-seat'
      },
      {
        name: 'Горячее питание',
        price: 800,
        isChosen: false,
        type: 'hot-meal'
      },
      {
        name: 'Дополнительный багаж',
        price: 1200,
        isChosen: false,
        type: 'extra-luggage'
      },
      {
        name: 'Бизнес класс',
        price: 1200,
        isChosen: false,
        type: 'business'
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        name: 'Экскурсия с гидом',
        price: 100,
        isChosen: false,
        type: 'guide'
      },
      {
        name: 'Покупка сувениров',
        price: 150,
        isChosen: false,
        type: 'spa'
      },
      {
        name: 'Обед',
        price: 300,
        isChosen: false,
        type: 'meal'
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        name: 'Персональная экскурсия',
        price: 450,
        isChosen: false,
        type: 'personal-guide'
      },
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  }
]);

