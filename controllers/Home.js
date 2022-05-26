module.exports = (app) => {
    app.get("/home", (req, res) => {
        //test
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        today = `${dd}/${mm}/${yyyy}`;


        const post = {
            name: "Quoc Binh",
            post_link: "Nam tempor posuere baucibus",
            summary_content: "aliqam dictum nec massa ac consequat. Etiam dignissim tincidunt tellis sed vassibuim sed vitae vestibuium ourus.",
            number_like: 100,
            date_post: today
        };
        const posts = [post, post, post, post, post, post, post];
        const menu = [
            {
                name: "Feeds",
                link: "/home"
            },
            {
                name: "My Photos",
                link: "/photo"
            },
            {
                name: "My Album",
                link: "/album"
            },

        ];
        const request = {
            posts,
            menu,
        }


        res.render('home', request);
    });

}