import {NavBar} from 'antd-mobile';
import {useNavigate} from 'react-router-dom';

export default ({children = '未定义'}) => {
    const navigate = useNavigate();
    const back = () => {
        navigate(-1);
    };
    return (
        <NavBar onBack={back}>{children}</NavBar>
    );

}
