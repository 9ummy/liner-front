import linerLogo from '../../assets/Logo/liner-logo.svg';

export interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <a
      className={className}
      style={{ padding: '10px' }}
      href='https://getliner.com'>
      <img src={linerLogo} alt='liner logo' />
    </a>
  );
};

export default Logo;
