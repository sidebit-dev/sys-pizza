import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image'
import logoImg from '../../../public/logo.svg';
import { FiLogOut} from 'react-icons/fi';

import { AuthContext } from '../../contexts/AuthContext';

export function Header(){

    const { signOut } = useContext(AuthContext);
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                <Image src={logoImg} width={190} height={60} alt="Logo Sys Pizzaria" />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href={"/category"} className={styles.text}>
                    Categoria
                    </Link>

                    <Link href={"/product"} className={styles.text}>
                    Cardápio
                    </Link>

                    <button onClick={signOut}>
                       <FiLogOut color='#FFF' size={24}/> 
                    </button>
                </nav>
            </div>
        </header>
    )
}