import React from 'react';
import styles from './SplitNavMenu.module.scss';
import { NavLink } from 'react-router-dom';
import type { NavListGroup } from './SplitNavTypes';

interface SplitNavMenuProps {
    navListGroups: NavListGroup[];
    isSingleColumn?: boolean;
}

const SplitNavMenu: React.FC<SplitNavMenuProps> = props => {
    const isSingleColumn = props.isSingleColumn ?? false;

    return <div className={styles.menuNavigation}>
        {props.navListGroups.map(group => {
            return <div className={styles.section}>
                <h3>{group.title}</h3>
                <ul>
                    {group.items.map(item => {
                        return <li><NavLink
                            className={({ isActive, isPending, isTransitioning }) =>
                                [
                                    isPending ? "pending" : "",
                                    (isActive && !isSingleColumn) ? styles.active : "",
                                    isTransitioning ? "transitioning" : "",
                                ].join(" ")
                            }
                            to={item.to}>{item.title}
                        </NavLink></li>
                    })}
                </ul>
            </div>
        })}
    </div>
}

export default SplitNavMenu;
