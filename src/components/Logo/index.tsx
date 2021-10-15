import { Link } from 'react-router-dom';
import linerLogo from '../../assets/Logo/liner-logo.svg';

export interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link
      className={className}
      style={{ padding: '10px' }}
      to='https://getliner.com'>
      <img src={linerLogo} alt='liner logo' />
    </Link>
  );
};

export default Logo;
