import homeLight from '@icons/home-light.svg';
import homeDark from '@icons/home-dark.svg';
import groupLight from '@icons/group-light.svg';
import groupDark from '@icons/group-dark.svg';
import productLight from '@icons/product-light.svg';
import productDark from '@icons/product-dark.svg';
import logoutLight from '@icons/logout-light.svg';
import logoutDark from '@icons/logout-dark.svg';

const sideBarItems = [
    {
        id: 1,
        name: 'Home',
        iconLight: homeLight,
        iconDark: homeDark,
        linkTo: '/'
    },
    {
        id: 2,
        name: 'Products',
        iconLight: productLight,
        iconDark: productDark,
        linkTo: '/products'
    },
    {
        id: 3,
        name: 'Group Items',
        iconLight: groupLight,
        iconDark: groupDark,
        child: [
            {
                id: 4,
                name: 'Item1',
                iconLight: homeLight,
                iconDark: homeDark,
                linkTo: '/groups/1'
            },
            {
                id: 5,
                name: 'Item2',
                iconLight: productLight,
                iconDark: productDark,
                linkTo: '/groups/2'
            }
        ]
    },
    {
        id: 7,
        name: 'Logout',
        iconLight: logoutLight,
        iconDark: logoutDark
    }
];

export default sideBarItems;
