// @ts-nocheck
export default {
    "header": {
        app: import("header/App"),
        element: document.getElementById("header"),
        props: {
            label: "MMT Winter Sale"
        }
    },
    "basket": {
        app: import("basket/App"),
        element: "basket",
        props: {}
    },
    "catalogue": {
        app: import("catalogue/App"),
        element: "catalogue",
        props: {}
    },
    "checkout": {
        app: import("checkout/App"),
        element: document.getElementById("checkout"),
        props: {}
    },
} 