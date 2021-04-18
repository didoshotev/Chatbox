import MainChat from "../chat-layout/main/main"
import Chat from "../chat/chat"
import ChatLayout from "../chat/chatLayout"
import Header from "../global/header"

const HomePage = () => {

    return (
        <div>
            <Header />
            {/* <Chat /> */}
            <section>
                <MainChat />
            </section>
        </div>
    )
}

export default HomePage