const Discord = require ('discord.js');
const client = new Discord.Client();
const settings = require ('./settings.json');
const moment = require ('moment');
const { prefix } = require('./settings.json');
const os = require('os');
const arch = os.arch()
let uptime = process.uptime();
const Unit = ['', 'K', 'M', 'G', 'T', 'P'];
const BytesToSize = (input, precision) => {
    let index = Math.floor(Math.log(input) / Math.log(1024));
    if (Unit >= Unit.length) return input + ' B';
    return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + Unit[index] + 'B';
  };
client.on('ready', () => {
    console.log(`${client.user.username} is nu online!`);
    client.user.setStatus("ONLINE")
    client.user.setActivity("TheEagle || Orders || &help", {type: "PLAYING"});
});
client.on("message", message => {
    if(message.content.toLowerCase().startsWith(prefix + "creators")) {
    let maker = new Discord.RichEmbed()
	.setColor("#FE642E")
    .setTitle("creator")
    .addField("OfficieelFerdi🦅#5109, Sundeep#9204", "made in vscode")
    .setFooter(`all rights reserved ©️ TheEagle™ 2018`)
    message.channel.send(maker)
    }
    if(message.content.toLowerCase().startsWith(prefix + "botinfo")) {
        message.delete()
        let MemoryUsing = BytesToSize(process.memoryUsage().rss, 3);
        let totalSeconds = process.uptime();
        let realTotalSecs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);
        let embed = new Discord.RichEmbed()
        .setDescription("Bot Informatie")
        .setColor("#FE642E")
        .addField("Naam van de bot:", `${client.user.username}`)
        .addField("Ping", `${client.pings[0]}ms`)
        .addField("Players:", `${client.users.size}`)
        .addField("Humans", message.guild.memberCount > message.guild.members.filter(m => m.user.bot).size, true)
        .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
        .addField("Channels:", `${client.channels.size}`)
        .addField("Online time",`Dagen: ${days} | Uren: ${hours} | Minuten: ${mins} | Seconden: ${realTotalSecs}`)
        .setFooter(`all rights reserved ©️ TheEagle™ 2018`,)
        message.channel.send({embed});
    }
     if(message.content.toLowerCase().startsWith(prefix + "botinfo")) {

     }
});
let attempts = (0)
client.on ('message', async function (message) {
const args = message.content.slice(prefix.length).trim().split(/ +/g);
let Onderwerp = message.content.slice(prefix.length + args[0].length)
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
        if (args[0] === "open" || args[0] === "new"|| args[0] === "ticket") {
            message.delete()
        if (!args[1]) return message.reply("use: `&ticket <ask>`, abuse is **BAN**!`!");
        let ticketchannel = await message.guild.createChannel(`ticket>${message.author.username}`, "text",
        [{
            type: 'role',
            id: message.guild.id,
            deny: 523328
        },
        {
            type: 'TheEagle',
            id: '507287214284341252',
            allow:384064
        },
        {
            type: 'member',
            id: message.member.id,
            allow: 101440
        }]);
        let user = message.author;
        let ticketemb = new Discord.RichEmbed()
        .setFooter(`you can rate this ticket with it command !rate`)
        .setColor("#FE642E")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`Hallo **${message.author.username}**,\n\nTy voor create a ticket!\nA staff member will remedy you as soon as possible and complete your ticket.`)
        .addField("created by", `${user}`)
        .addField("ask", `${Onderwerp}`)

        ticketchannel.send(ticketemb);
        let messagechannelid = message.channel.id
        let embedje = new Discord.RichEmbed().setTitle("Ticket").setColor("#FE642E").setDescription(`**ticket is succesfull created**\n**Channel:** ${ticketchannel}`)
                message.guild.channels.find("id",`${messagechannelid}`).send(embedje);
    } else if (args[0] === "close") {
        if (!message.channel.name.startsWith("ticket")) return message.channel.send("this is not a ticket!");
        if (attempts == 1) {
            message.channel.delete();
            attempts = 0;
            return;
        }
        message.channel.send("are you sure you want to delete this ticket? Type  one more time `&close`");
        attempts = 1;
    } else if (args[0] === "ready") {
        message.delete()
        if (!message.channel.name.startsWith("ticket")) return message.channel.send("this channel is not a ticket!");
        if (attempts == 1) {
            message.channel.send("this ticket is now `rounded`")
            attempts = 0;
            return;
        }
        message.channel.send("are you sure this is ready ticket? type one more time `&ready`");
        attempts = 1;
    } else if (args[0] === "rename") {
        message.delete()
        let rename = message.content.slice(prefix.length + args[0].length)
        if (!message.channel.name.startsWith("ticket")) return message.channel.send("this channel is not a ticket!");
        if (!args[1]) return message.channel.send("give me a used name!");
        message.channel.setName(`ticket>${rename}`);
        message.channel.send(`name of this channel is succesful changed: ticket>${args[1].toLowerCase()}`)
    } else if (args[0] === "rate") {
        message.delete()
        let ratings = message.guild.channels.find("name", "feedback");
        if (!args[1]) return message.channel.send("type (good/avarage/bad)");
        if (!message.channel.name.startsWith("ticket")) return message.channel.send("this channel is not a ticket");

        if (args[1].toLowerCase() === "good") return message.channel.send(`${message.member.user.username} find this ticket ***good***`).then(client.channels.get('467322604475252746').send(`**${message.member.user.username}** gaf voor zijn/haar support ticket een ***goed***`))
        else if (args[1].toLowerCase() === "avarage") return message.channel.send(`${message.member.user.username} find this ticket ***avarage***`).then(client.channels.get('467322604475252746').send(`**${message.member.user.username}** gaf voor zijn/haar support ticket een ***gemiddeld***`))
        else if (args[1].toLowerCase() === "bad") return message.channel.send(`${message.member.user.username} find this ticket ***bad***`).then(client.channels.get('467322604475252746').send(`**${message.member.user.username}** gaf voor zijn/haar support ticket een ***slecht***`))
        else return message.channel.send("choose good/avarage/bad!");
    } else if (args[0] === "help") {
        message.delete()
        tickethelpemb = new Discord.RichEmbed()
        .setColor("#FE642E")
        .setThumbnail(message.guild.iconURL)
        .setFooter(`all rights reserved ©️ theEagle™ 2018`)
        .setTitle("Hulp Menu")
        .setDescription("al commands of TheEagle Bot!")
        .addField("Default", "&help | The menu you are currently in. \n&botinfo | Get information about the bot.\n&memberinfo <user> | Get information about a person.\n&creators | Show the makers of the bot")
        .addField("tickets", "&ticket | make a ticket.\n&close| close a ticket.\n&rename <naam> | rename a ticket.\n&rate <good/avarage/bad> | Give your ticket a feedback. ")
        message.channel.send(tickethelpemb);
    }
});
client.on("message", message =>{
if (message.content.toLowerCase().startsWith(prefix + "memberinfo")) {
    message.delete()
	let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user);
    const embed = new Discord.RichEmbed()
		.setColor('#FE642E')
		.setThumbnail(user.avatarURL)
		.setTitle(`${user.username}#${user.discriminator}`)
		.addField("ID:", `${user.id}`, true)
		.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'Geen'}`, true)
		.addField("Account ,maded on:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("Server joined on:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("Status:", `${user.presence.status}`, true)
		.addField("game activity:", `${user.presence.game ? user.presence.game.name : 'Geen'}`, true)
		.addField("roles claimed:", member.roles.map(roles => `${roles.name}`).join(', '), true)
		.setFooter(`answer on: ${message.author.username}#${message.author.discriminator}`)
     message.channel.send({embed});
}});



client.login(settings.token);
