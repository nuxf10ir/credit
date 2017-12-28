_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

var treeParams = {
    questions: {
        1: {
            text: "Кредитный лимит эффективен?",
            type: "question",
            buttons: {
                yes: {
                    id: 3,
                    method: "next"
                },
                no: {
                    id: 2,
                    method: "next"
                }
            }
        },
        2: {
            text: "Лимит действует дольше трех месяцев?",
            type: "question",
            buttons: {
                yes: {
                    id: 6,
                    method: "end"
                },
                no: {
                    id: 3,
                    method: "next"
                }
            }
        },
        3: {
            text: "Лимит востребован клиентами группы?",
            type: "question",
            buttons: {
                yes: {
                    id: 4,
                    method: "next"
                },
                no: {
                    id: 5,
                    method: "end"
                }
            }
        },
        4: {
            text: "Доля просроченной дебиторки в общей задолженности растет?",
            type: "question",
            buttons: {
                yes: {
                    id: 7,
                    method: "end"
                },
                no: {
                    id: 8,
                    method: "end"
                }
            }
        },
        5: {
            text: "Доля просроченной дебиторки в общей задолженности растет?",
            type: "question",
            buttons: {
                yes: {
                    id: 9,
                    method: "end"
                },
                no: {
                    id: 10,
                    method: "next"
                }
            }
        },
        6: {
            type: "answer",
            text: "Данную группу клиентов стоит перевести на систему поставки по факту оплаты. Начните с компаний с наименьшей эффективностью и стратегической ценностью для компании.",
            buttons: null
        },
        7: {
            type: "answer",
            text: "Для данной группы клиентов стоит увеличить кредитный лимит до уровня фактической потребности контрагентов или с запасом с учетом динамики продаж. Период отсрочки корректируйте исходя из анализа эффективности – если уровень эффективности группы ниже среднего по сравнению с другими группами, переведите часть клиентов группы с большей долей просроченной дебиторки на меньший срок оплаты. Если эффективность выше средней - увеличьте отсрочку.",
            buttons: null
        },
        8: {
            type: "answer",
            text: "Для данной группы клиентов стоит увеличить кредитный лимит до уровня фактической потребности контрагентов или с запасом с учетом динамики продаж. Период отсрочки оставьте без изменений.",
            buttons: null
        },
        9: {
            type: "answer",
            text: "Для данной группы клиентов стоит урезать кредитный лимит до уровня фактической потребности контрагентов. Период отсрочки корректируйте исходя из анализа эффективности – если уровень эффективности группы ниже среднего по сравнению с другими группами, переведите часть клиентов группы с большей долей просроченной дебиторки на меньший срок оплаты. Если эффективность выше средней – увеличьте отсрочку.",
            buttons: null
        },
        10: {
            type: "answer",
            text: "Для данной группы клиентов стоит урезать кредитный лимит до уровня фактической потребности контрагентов. Период отсрочки оставьте без изменений.",
            buttons: null
        }



    }
};

jQuery.fn.questionsTree = function(steps) {
    var $self = $(this),
        cardTmpl = _.template($("#card-tmpl").html());


    function startCard(id) {
        var $card = $(cardTmpl(steps.questions[id])),
            $buttons = $card.find(".card-button");

        $buttons.length && $buttons
            .bind("click.answer", function () {
                var $this = $(this),
                   data = $this.data();

                if (data.method === "reset") {

                    clearTree();

                } else {
                    $buttons
                        .parent(".card-button_out")
                        .removeClass("selected");

                    $this
                        .parent(".card-button_out")
                        .addClass("selected");

                    $this
                        .parents(".card")
                        .nextAll()
                        .remove();

                    startCard(data.id);
                }



            });

        $card.appendTo($self);

        $(window).scrollTo($card[0], 400);

    }

    function clearTree() {
        $self.empty();
        startCard(1);
    }



    return {
        next: function(id) {
            startCard(id);
        },
        reset: function () {
            clearTree()
        }
    };
};


$("#cards-tree").questionsTree(treeParams).next(1);


