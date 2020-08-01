const Discord = require('discord.js')
const config = require('../config.json')
var prefix = config.prefix
const fs = require('fs')

module.exports = (msg) => {
    if (msg.content.startsWith(prefix + 'ban')) {

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            const banEmbed = new Discord.MessageEmbed()
                .setTitle('Ban')
                .setColor('#ff0000')
                .setDescription('You don\'t have the permission to do that !')
                .setTimestamp()
            msg.channel.send(banEmbed)
            console.log(`${msg.author.username} want to ban but failed`)
            fs.appendFile('logs/BanLogs.txt', `\n${msg.author.username} want to ban but failed`, function (erreur) {
                if (erreur) {
                    console.log(erreur)
                }
            })

        } else {
            const args = msg.content.slice(prefix.length).trim().split(' ')
            let member = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[1]))
            if (!args[1]) {
                const banEmbed = new Discord.MessageEmbed()
                    .setTitle('Ban')
                    .setColor('#ff0000')
                    .setDescription('You didn\'t provide a username to ban !')
                    .setTimestamp()
                msg.channel.send(banEmbed)
                console.log(`${msg.author.username} want to ban but username not provided`)
                fs.appendFile('logs/BanLogs.txt', `\n${msg.author.username} want to ban but username not provided`, function (erreur) {
                    if (erreur) {
                        console.log(erreur)
                    }
                })

            } else if (!args[2]) {
                const banEmbed = new Discord.MessageEmbed()
                    .setTitle('Ban')
                    .setColor('#ff0000')
                    .setDescription('You didn\'t provide a reason !')
                    .setTimestamp()
                msg.channel.send(banEmbed)
                console.log(`${msg.author.username} want to ban`, `${member.user.tag}`.red, 'but no reason provided')
                fs.appendFile('logs/BanLogs.txt', `\n${msg.author.username} want to ban ${member.user.tag} but no reason provided`, function (erreur) {
                    if (erreur) {
                        console.log(erreur)
                    }
                })

            } else {
                let reason = args[2]
                member.ban(reason)
                const banEmbed = new Discord.MessageEmbed()
                    .setTitle('Ban')
                    .setColor('#ff0000')
                    .setDescription(`${member.user.tag} Has been ban for ${reason} :white_check_mark:`)
                    .setTimestamp()
                msg.channel.send(banEmbed)
                console.log(`${msg.author.username} baned`, `${member.user.tag}`.red, 'for', `${reason}`.blue)
                fs.appendFile('logs/BanLogs.txt', `\n${msg.author.username} baned ${member.user.tag} for ${reason}`, function (erreur) {
                    if (erreur) {
                        console.log(erreur)
                    }
                })

            }
        }

    }

}
