import { NavLink } from "react-router-dom";
import View from "./View";
import styles from './List.module.scss';
import type { NavListGroup } from "./NavListData";

interface NavListListProps {
    navListGroups: NavListGroup[];
}

/**
 * The list element of a nav list.
 * 
 * @param props 
 * @returns 
 */
const NavListList = (props: NavListListProps) => {
    const activeClass = styles.active;
    return <View className={styles.nav}>
        {props.navListGroups.map(group => {
            return <>
                <h3>{group.title}</h3>
                <ul>
                    {group.items.map(item => {
                        return <li><NavLink 
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? styles.active : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
                        to={item.to} >{item.title}</NavLink></li>
                    })}
                </ul>
            </>
        })}
    </View>
}

export default NavListList;