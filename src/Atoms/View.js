import { Link } from 'react-router-dom'
import { Table, Button, Input, Space, } from 'antd';

const View = (props) => {

    return (
        <Link
            key={"myRoute"}
            to={`/FormDetails/${props.each.id}`}
            state={{ data: props.each }}

        >
            {/* <button className="infoformbtn">view</button> */}
            <Button type="primary" className="tag-primary btn br-7" >
                VIEW
            </Button>
        </Link>
    );
}

export default View;