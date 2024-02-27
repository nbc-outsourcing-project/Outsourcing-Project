import { Link, Outlet } from 'react-router-dom';
import * as S from '../../styles/aside';
import Search from '../Search';

const Aside = () => {
  return (
    <>
      <S.Aside>
        <Link to="/">LOGO</Link>
        <Search />
      </S.Aside>
      <Outlet />
    </>
  );
};

export default Aside;
