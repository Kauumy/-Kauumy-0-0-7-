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

  if(!config.idAdmin.find(id => id == msg.author.id)) return msg.channel.send(msgResX);
  if(msg.channel.id != config.idChannelAdmin) return msg.channel.send(msgResX2);
  
  const msgRes = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`**${client.user.username}**`)
    .addField(`**🖥️ Servidores 🖥️**`, `\n\n**${client.guilds.map(a => `◽ ${a.name} [${a.members.size} Membros]`).join("\n")}**\n\n`, false)
    .setTimestamp()
    .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);

  //${client.guilds.map(a => `◽ ${a.name} [${a.members.size} Membros]`).join("\n")}
  msg.channel.send(msgRes).then((m) => {
    console.log(`Cliente: ${msg.author.tag} | Comando: Servers | Resposta: Servidores enviados no canal.`);
    m.delete(60000);
  }).catch((err) => {
    const msgResErr = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`**${client.user.username}**`)
      .addField(`**❌ Erro ❌**`, `\n\n**Erro: ${err}**\n\n`, false)
      .addField(`**Sugestão**`, `\n\n**Foi enviado no console do BOT a resposta.**\n\n`, false)
      .setTimestamp()
      .setFooter(`© Copyright ${client.user.username} - Todos os direitos reservados`);
    msg.channel.send(msgResErr);
    console.log(`Cliente: ${msg.author.tag} | Comando: Servers | Resposta: ${err}`);
    console.log(`**🖥️ Servidores 🖥️**\n\n**${client.guilds.map(a => `◽ ${a.name} [${a.members.size} Membros]`).join("\n")}**\n\n`);
  });

}

