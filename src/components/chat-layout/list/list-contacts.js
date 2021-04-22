import List from '@material-ui/core/List';
import ListContact from './list-item'

const ListContacts = () => {

    const dummyData = [
        {
            key: "Main Conversation",
            status: "online",
            img: "https://material-ui.com/static/images/avatar/1.jpg",
        },
        // {
        //     key: "Alice",
        //     status: "offline",
        //     img: "https://material-ui.com/static/images/avatar/3.jpg",
        // },
        // {
        //     key: "CindyBaker",
        //     status: "offline",
        //     img: "https://material-ui.com/static/images/avatar/2.jpg",
        // },
    ]

    return (
        <List>
            {dummyData.map((item, index) => {
                return <ListContact key={index} name={item.key} status={item.status} img={item.img}/>
            })}
        </List>
    )
}

export default ListContacts