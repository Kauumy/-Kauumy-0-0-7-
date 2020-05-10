const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.reply(
      "| Você nao possui permissao para isto."
    );
  if (!args[0]) return message.channel.send(`:| Use: ${config.prefix}clear 1-100`);
  message.channel.bulkDelete(args[0]).then(() => {});

  let embed = new Discord.RichEmbed()
    .setTitle("Acao | Mensagens removidas")
    .setColor(`${config.corembed}`)
    .setDescription(`Limpei um total de: ${args[0]} mensagens.`)
    .setFooter(`Solicitado por: ${message.author.tag}`).setColor("#FF36FB")
  message.channel.send(embed).then(msg => {
    msg.delete(5000);
  });
};

module.exports.help = {
  name: "clear"
};