import React from 'react';
import Progressbar from '../Progressbar/Progressbar';

import styles from './Bargraph.module.scss';
import Yaxis from '../Yaxis/Yaxis';
import Loader from '../Loader/Loader';

import { maxObjArray } from '../../../utils/Utils';
import { WIDTH, HEIGHT, YAXIS } from '../../../utils/default';
import Aux from '../../../hoc/Aux';

/**
 * BarGraph component
 * 
 * @param {object} param0
 */
const Bargraph = ({ history = [], loading, title, width = WIDTH, height = HEIGHT }) => {

  const maxScore = maxObjArray(history);
  let container = [<Loader key="loader" />];

  if (!loading) {
    // empty the container 
    container.length = 0;

    container.push(<Yaxis key="yaxis" points={ YAXIS } />);
    container.push(
      history
        .sort((a, b) => (new Date(a.date) > new Date(b.date)))   // Sort history by date ( right to left )
        .map((session, index) => (
          <Progressbar
            key={ index }
            percent={ session.score / maxScore * 100 }
            value={ session.score }
          />
        ))
    )
  }
  return (
    <main className={ styles.container }>
      <h3 className={ styles.graphTitle }>{ title }</h3>
      <dl className={ styles.bargraph } style={ { height, width } }>
        { container }
      </dl>
    </main>
  );
}


export default Bargraph;