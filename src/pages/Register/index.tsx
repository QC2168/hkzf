import styles from './index.module.less';
import NavBar from '../../components/NavBar';
import {Formik, Field, Form, FormikHelpers} from 'formik';
import {LoginType} from '../../network/types';
import {register} from '../../network/api';
import {useAtom} from 'jotai';
import {updateUserStoreAtom} from '../../atom';
import {useNavigate} from 'react-router-dom';
import {object, string} from 'yup';
import {Toast} from 'antd-mobile';
import {SetToken} from "../../utils";
// 规则
const LoginRules = object({
    username: string().required(),
    password: string().required()
});
export default () => {
    const navigate = useNavigate();
    const [, updateUserData] = useAtom(updateUserStoreAtom);
    return (
        <>
            <NavBar>注册用户</NavBar>
            <div className={styles.bg}>
                <div className={styles.wel}>
                    Register
                </div>
                <Formik
                    validationSchema={LoginRules}
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    onSubmit={async (
                        {username, password}: LoginType,
                        {setSubmitting}: FormikHelpers<LoginType>
                    ) => {
                        // 发送网络请求
                        const {token} = await register({username, password});
                        // 写入atom
                        const res = {username, token};
                        updateUserData(res);
                        SetToken(token)
                        Toast.show({
                            content: '注册成功',
                            icon:'success',
                        })
                        // 注册成功
                        navigate('/Profile');

                        setSubmitting(false);
                    }}
                >
                    {
                        ({errors, touched}) => {
                            console.log(errors);
                            console.log(touched);
                            return (<Form>
                                {/*    输入框*/}
                                <div className={styles.username}>
                                    {errors.username?<div className={styles.tip}>{errors.username}</div>:''}
                                    <Field id="username" name="username" placeholder="请输入你的账号"/>
                                </div>
                                <div className={styles.username}>
                                    {errors.password?<div className={styles.tip}>{errors.password}</div>:''}
                                    <Field className={styles.password} id="password" name="password"
                                           placeholder="请输入你的密钥"/>
                                </div>
                                {/*    登录按钮*/}
                                <button type="submit" className={styles.login}>
                                    LOGIN
                                </button>
                            </Form>
                        )
                        }

                    }

                </Formik>
            </div>
        </>
    );
}
