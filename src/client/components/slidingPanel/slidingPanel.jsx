// import * as React from 'react';
// import { StyleRulesCallback, withStyles, WithStyles } from 'material-ui/styles';

// type TStyleRules = 'root' | 'container';

// const styles: StyleRulesCallback<TStyleRules> = (theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     flex: 1,
//     minWidth: 0,
//     overflow: 'hidden',
//   },
//   container: {
//     display: 'flex',
//     flex: 1,
//     minHeight: 0,
//     overflow: 'hidden',
//     transition: '.5s',
//   },
// });

// export type TSlidePanelHandler = (panel: number) => void;

// interface ISlidingPanelProps {
//   children: any;
//   current: number;
//   panels: number;
// }

// export function slidingPanel({
//   classes,
//   children,
//   current,
//   panels,
// }: ISlidingPanelProps & WithStyles<TStyleRules>) {
//   const x: number = 100 * (current / panels);
//   const containerStyle: React.CSSProperties = {
//     transform: [[`translateX(-${x}%)`]],
//     width: `${panels * 100}%`,
//   };
//   return (
//     <div className={classes.root}>
//       <div className={classes.container} style={containerStyle}>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default withStyles(styles)(slidingPanel);
