export type TQuestion = {
  id: number;
  categoryId: number;
  question: string;
  answer: string;
  nameOfList?: string;
  list?: string;
};

export const questions: TQuestion[] = [
  {
    id: 1,
    categoryId: 1,
    question: "Что такое HTML?",
    answer:
      "HTML (от англ. HyperText Markup Language — «язык гипертекстовой разметки») –\n" +
      "стандартизированный язык позволяющий составлять форматированный текст.\n" +
      "Далее браузер отображает этот текст на экране в виде элементов. Это скелет либой\n" +
      "веб страницы. Основная задача – помочь браузеру отобразить информацию.",
  },
  {
    id: 2,
    categoryId: 1,
    question: "Что такое Doctype?",
    answer:
      "<!DOCTYPE html> используется для указания типа документа. Добавляется первой\n" +
      "строкой любого html | xhtml документа. Служит для того чтобы браузер понимал\n" +
      "как интерпретировать страницу и с каким стандартом парсить документ.\n" +
      "(Парсинг файла – это вычленение необходимой информации из файла по\n" +
      "шаблону, что позволяет получить нужные данные в удобном формате, не прибегая\n" +
      "к ручному перебору, экономя тем самым время.)\n",
  },
  {
    id: 3,
    categoryId: 1,
    question: "Базовая структура HTML-страницы?",
    answer:
      "<!DOCTYPE html>\n" +
      "<html lang=”en”>\n" +
      "<head> (вспомогательный тег, содержит подключение шрифтов,стилей, мета\n" +
      "информации)\n" +
      "<meta charset=”UTF-8”>\n" +
      "<title>Document</title>\n" +
      "</head>\n" +
      "<body> (разметка которая будет отображаться в файле)\n" +
      "<h1>Hello world!</h1>\n" +
      "</body>\n" +
      "</html>\n" +
      "Метаинформация включает в себя: автора, иконку, название и контент (описание\n" +
      "сайта например)",
  },
  {
    id: 4,
    categoryId: 1,
    question: "Что такое семантика? Какие семантичные тэги вы знаете?",
    answer:
      "Семантика в html – это использование правильных тегов описывающих\n" +
      "содержимое контента внутри себя. Семантичный тег носит смысловое объяснение.\n",
    nameOfList: "Global:",
    list:
      " <header>\n" +
      " <footer>\n" +
      " <aside>\n" +
      " <nav>\n" +
      " <main>",
  },
];
