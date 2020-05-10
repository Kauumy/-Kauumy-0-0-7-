const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, msg, args) => {

  const msgResX = new Discord.RichEmbed()
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

  if(!msg.member.roles.some(r => ["Div"].includes(r.name)) && !config.idAdmin.find(id => id == msg.author.id)) return msg.channel.send(msgResX);
  if(msg.channel.id != config.idChannelCmdClient && msg.channel.id != config.idChannelAdmin) return msg.channel.send(msgResX2);

  const msgRes = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**Membros [Vinculados ao BOT]**`, `\n\n**Online [${client.users.filter(m => m.presence.status === 'online').size}]**\n**Não pertube [${client.users.filter(m => m.presence.status === 'dnd').size}]**\n**Ausente [${client.users.filter(m => m.presence.status === 'idle').size}]**\n\n**Total Online [${client.users.filter(m => m.presence.status === 'idle').size+client.users.filter(m => m.presence.status === 'dnd').size+client.users.filter(m => m.presence.status === 'online').size}]**\n\n**Offline [${client.users.filter(m => m.presence.status === 'offline').size}]**\n\n**Total [${client.users.size}]**\n\n`, false)
    .addField(`**Servidores [Vinculados ao BOT]**`, `\n\n**Total [${client.guilds.size}]**\n\n`, false)
    .addField(`**Conexão [REDE]**`, `\n\n**Seu ping [${Date.now() - msg.createdTimestamp} ms]**\n**Ping do BOT [${client.ping} ms]**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);
  
  msg.channel.send(msgRes).then((m) => {
    console.log(`Cliente: ${msg.author.tag} | Comando: Status | Resposta: Status enviado no canal.`);
    m.delete(60000);
  }).catch((err) => {
    console.log(`Cliente: ${msg.author.tag} | Comando: Status | Resposta: ${err}`);
  });

}

