// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
      login: `${ROOTS.AUTH}/login`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    // two: `${ROOTS.DASHBOARD}/two`
    // three: `${ROOTS.DASHBOARD}/three`,
    // group: {
    //   root: `${ROOTS.DASHBOARD}/group`,
    //   five: `${ROOTS.DASHBOARD}/group/five`,
    //   six: `${ROOTS.DASHBOARD}/group/six`,
    // },
  },
};
