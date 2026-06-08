import React from 'react';
import styles from './MenuNavigation.module.scss';
import { NavLink } from 'react-router-dom';

interface NavListItem {
    title: string;
    to: string;
}
interface NavListGroup {
    title: string;
    items: NavListItem[];
}

interface ListProps {
    navListGroups: NavListGroup[];
    isSingleColumn?: boolean;
}

const MenuNavigation: React.FC<ListProps> = props => {
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
                            to={item.to} >{item.title}
                        </NavLink></li>
                    })}
                </ul>
            </div>
        })}
    </div>
}

export default MenuNavigation;
