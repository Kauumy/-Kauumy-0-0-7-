const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, msg, args) => {

  /*const msgResX = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**Você não possui permissão para executar este comando.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  const msgResX2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**❌ PROIBIDO ❌**`, `\n\n**O uso deste comando não é permitido neste canal.**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  if(!config.idAdmin.find(id => id == msg.author.id) || !msg.member.roles.some(r => ["Cliente"].includes(r.name))) return msg.channel.send(msgResX);
  if(msg.channel.id != config.idChannelCmdClient) return msg.channel.send(msgResX2);*/
  
  const msgRes = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**PING**`, `\n\n**Seu ping é de ${Date.now() - msg.createdTimestamp} ms**\n**Ping do bot é de ${client.ping} ms**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  msg.channel.send(msgRes).then((m) => {
    console.log(`Cliente: ${msg.author.tag} | Comando: Ping | Resposta: (Seu ping: ${Date.now() - msg.createdTimestamp} ms | Ping do bot: ${client.ping} ms).`);
    m.delete(60000);
  }).catch((err) => {
    console.log(`Cliente: ${msg.author.tag} | Comando: Ping | Resposta: ${err}`);
  });

}

