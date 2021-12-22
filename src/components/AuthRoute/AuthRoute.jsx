import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../utils';

export default ({ component: Component }) => {
  const isLogin = isAuth();
  return (
    <Route
      render={(props) => (isLogin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))}
    />
  );
};
// export default class AutoRoute extends PureComponent {
//   render() {
//     const { component: Component } = this.props;
//     const isLogin = isAuth();
//     return (
//       <Route
//         render={(props) => (isLogin ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: props.location },
//             }}
//           />
//         ))}
//       />
//     );
//   }
// }
