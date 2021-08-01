// 更新导入 React Router 的语句，加入 Redirect
import { useQuery } from "@apollo/client";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Pages from "../pages";

// 在Pages组件下面添加PrivateRoute组件
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // 显示一个消息，指明正在加载数据
    if (loading) return <p>Loading...</p>;
    // 如果获取数据出错，显示一个错误消息
    if (error) return <p>Error!</p>;
    // 如果用户已登录，把用户带到请求的组件
    // 否则重定向到登录页面
    return (
        <Route {...rest} render={props => data.isLoggedIn === true ? (
            <Component {...props} />
        ) : (
            <Redirect
                to={{ pathname: 'signin', state: { form: props.location } }}
            />
        )}>
        </Route>
    )
}

export default Pages;