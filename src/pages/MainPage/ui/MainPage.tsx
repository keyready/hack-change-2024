import { AnimatedTree, Data, Tree } from 'react-tree-graph';


import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';


const MainPage = () => {
    const data: Data = {
        "name": "Компания ABC",
        "children": [
          {
            "name": "Отдел маркетинга",
            "children": [
              {
                "name": "Команда контента",
                "children": [
                  { "name": "Ирина Иванова", "position": "Копирайтер", "children": [] },
                  { "name": "Алексей Петров", "position": "Редактор", "children": [] },
                  { "name": "Марина Смирнова", "position": "Контент-менеджер", "children": [] },
                  { "name": "Дмитрий Соловьев", "position": "Графический дизайнер", "children": [] },
                  { "name": "Светлана Кузнецова", "position": "SEO-специалист", "children": [] }
                ]
              },
              {
                "name": "Команда SMM",
                "children": [
                  { "name": "Анна Васильева", "position": "Менеджер по соцсетям", "children": [] },
                  { "name": "Владимир Козлов", "position": "Аналитик социальных сетей", "children": [] },
                  { "name": "Елена Михайлова", "position": "Креативщик", "children": [] },
                  { "name": "Константин Романов", "position": "Специалист по таргетированной рекламе", "children": [] },
                  { "name": "Мария Сергеева", "position": "Блогер", "children": [] }
                ]
              },
              {
                "name": "Команда PR",
                "children": [
                  { "name": "Ольга Новикова", "position": "PR-менеджер", "children": [] },
                  { "name": "Максим Васин", "position": "Специалист по кризисному PR", "children": [] },
                  { "name": "Дмитрий Сидоров", "position": "Менеджер по событиям", "children": [] },
                  { "name": "Алина Коваленко", "position": "Журналист", "children": [] }
                ]
              }
            ]
          },
          {
            "name": "Отдел разработки",
            "children": [
              {
                "name": "Команда Front-end",
                "children": [
                  { "name": "Виктор Александров", "position": "Разработчик Front-end", "children": [
                    { "name": "Артем Григорьев", "position": "Стажер Front-end", "children": [] }
                  ] },
                  { "name": "Ирина Лебедева", "position": "Дизайнер UX/UI", "children": [] },
                  { "name": "Алексей Зайцев", "position": "Тестировщик", "children": [] },
                  { "name": "Наталья Морозова", "position": "Менеджер проекта", "children": [] }
                ]
              },
              {
                "name": "Команда Back-end",
                "children": [
                  { "name": "Роман Чернов", "position": "Разработчик Back-end", "children": [
                    { "name": "Игорь Лосев", "position": "Стажер Back-end", "children": [] }
                  ] },
                  { "name": "Виталий Петров", "position": "Инженер по базам данных", "children": [] },
                  { "name": "Сергей Шмидт", "position": "Системный администратор", "children": [] },
                  { "name": "Ольга Егорова", "position": "Разработчик API", "children": [] }
                ]
              },
              {
                "name": "Команда DevOps",
                "children": [
                  { "name": "Дмитрий Федоров", "position": "DevOps-инженер", "children": [] },
                  { "name": "Юлия Коваленко", "position": "Специалист по автоматизации", "children": [] },
                  { "name": "Никита Жуков", "position": "Cloud-архитектор", "children": [] }
                ]
              }
            ]
          },
          {
            "name": "Отдел продаж",
            "children": [
              {
                "name": "Команда продаж",
                "children": [
                  { "name": "Виктория Белова", "position": "Менеджер по продажам", "children": [] },
                  { "name": "Тимур Гусев", "position": "Менеджер по ключевым клиентам", "children": [] },
                  { "name": "Ирина Ширяева", "position": "Операционный менеджер", "children": [] },
                  { "name": "Юрий Лебедев", "position": "Специалист по работе с возражениями", "children": [] },
                  { "name": "Екатерина Мельникова", "position": "Аналитик продаж", "children": [] }
                ]
              },
              {
                "name": "Команда поддержки клиентов",
                "children": [
                  { "name": "Сергей Руденко", "position": "Менеджер по поддержке", "children": [] },
                  { "name": "Дарина Соколова", "position": "Техподдержка", "children": [] },
                  { "name": "Наталья Волкова", "position": "Специалист по обучению клиентов", "children": [] }
                ]
              }
            ]
          }
        ]
      }

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <AnimatedTree
                data={data}
                height={1000}
                width={1280}
                gProps={{
                    onClick: (event, nodeKey) => alert(`Left clicked ${nodeKey}`)
                }}
            />
        </Page>
    );
};

export default MainPage;
