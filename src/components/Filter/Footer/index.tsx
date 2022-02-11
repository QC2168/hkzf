import styles from './index.module.less';
import {Button, Grid} from 'antd-mobile';
interface props{
    confirm:()=>void,
    cancel:()=>void,
}
export default ({confirm,cancel}:props) => {

    return (
        <div className={styles.footer}>
            <Grid columns={3} gap={1}>
                <Grid.Item>
                    <Button onClick={()=>confirm()} size="small" shape="rounded" color="success">确定</Button>
                </Grid.Item>
                <Grid.Item/>
                <Grid.Item>
                    <Button onClick={()=>cancel()} size="small" shape="rounded" color="success">取消</Button>
                </Grid.Item>
            </Grid>
        </div>
    );
}
