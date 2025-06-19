import Layout from "../components/Layout";

const Notification = () => {
    return (
        <Layout>
            Notification page
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-border">
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Unread" />
                <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 1</div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Read" defaultChecked />
                <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 2</div>
            </div>
        </Layout>
    );
};

export default Notification;