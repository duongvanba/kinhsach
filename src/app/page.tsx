
"use client"

import { Box, Button, Card, CardBody, CardHeader, Center, CloseButton, HStack, Heading, Input, InputGroup, InputRightElement, List, ListIcon, ListItem, Stack, StackDivider, Tag, Text, VStack, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import { BiMoon, BiSolidSun, BiSolidUpvote } from 'react-icons/bi'
import { AiFillStar, AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import {BsFillCaretUpFill } from 'react-icons/bs'
import { ChangeColorMode } from './ChangeColorMode'
import { useState } from 'react'
import { SearchBox } from './SearchBox'
import ScrollToTop from "react-scroll-to-top";

const BibleList = [
  {
    name: 'Kinh Đức Chúa Thánh Thần',
    content: `Chúng con lạy ơn Đức Chúa Thánh Thần, thiêng liêng sáng láng vô cùng, chúng con xin Đức Chúa Thánh Thần xuống đầy lòng chúng con, là kẻ tin cậy Đức Chúa Trời, và đốt lửa kính mến Dức Chúa Trời trong lòng chúng con; chúng con xin Đức Chúa Trời cho Đức Chúa Thánh Thần xuống.
    Sửa lại mọi sự trong ngoài chúng con.Chúng con cầu cùng Đức Chúa Trời, xưa đã cho Đức Chúa Thánh Thần xuống soi lòng dạy dỗ các Thánh Tông Đồ, thì rày chúng con cũng xin Đức Chúa Trời cho Đức Chúa Thánh Thần lại xuống an ủi dạy dỗ chúng con làm những việc lành, vì công nghiệp vô cùng Đức Chúa Giêsu Kitô là Chúa chúng con. Amen.`,
    star: true
  },
  {
    name: 'Kinh Sấp Mình',
    content: `Lạy Chúa, con sấp mình xuống trước mặt Chúa. Con tin thật Chúa ở khắp mọi nơi, thông biết mọi sự, hằng xem thấy con, hằng nghe lời con cầu nguyện. Xin Chúa rất nhân từ hãy đoái xem sự nghèo ngặt con và nhận lời con nguyện. Lạy Chúa xin hãy mở miệng lưỡi con ra, thì con sẽ cao rao những lời ngợi khen Chúa.`,
    star: true
  },
  {
    name: 'Kinh Sáng Danh',
    content: `Sáng danh Đức Chúa Cha và Đức Chúa Con, và Đức Chúa Thánh Thần. Như đã có trước vô cùng và bây giờ và hằng có và đời đời chẳng cùng. Amen.`,
    star: true
  },
  {
    name: 'Kinh thờ lạy',
    content: `Lạy Chúa con, con là vật phàm hèn cùng là không trước mặt Chúa, con hết lòng thờ lạy và nhận thật. Chúa là đầu cội rễ mọi sự, là cùng sau hết mọi loàị Chúa đã dựng nên con cùng thật là Chúa con nữa, thì con xin dâng linh hồn và xác, cùng mọi sự trong ngoài con ở trong tay Chúa. Amen.`
  },
  {
    name: 'Kinh Đội Ơn',
    content: `Lạy Chúa, con đội ơn Chúa vì những ơn lành Chúa đã ban cho con xưa nay, nhất là đã dựng nên con và cho Con Chúa chịu chết mà cứu chuộc con, lại chọn lấy con làm con Hội Thánh nữa. Amen.

    `
  },
  {
    name: 'Kinh Tin',
    content: `Lạy Chúa, con tin thật có một Đức Chúa Trời là Đấng thưởng phạt vô cùng.  Con lại tin thật Đức Chúa Trời có Ba Ngôi, mà Ngôi Thứ Hai đã xuống thế làm Người, chịu nạn chịu chết mà chuộc tội cho thiên hạ.  Bấy nhiêu điều ấy cùng các điều Hội Thánh dạy thì con tin vững vàng, vì Chúa là Đấng thông minh và chân thật vô cùng đã phán truyền cho Hội Thánh.  Amen`,
    star: true
  },
  {
    name: 'Kinh Cậy',
    content: `Lạy Chúa , con trông cậy vững vàng, vì công nghiệp Đức Chúa Giêsu thì Chúa sẽ ban ơn cho con giữ đạo nên ở đời này, cho ngày sau được lên thiên đàng xem thấy mặt Đức Chúa Trời hưởng phúc đời đời, vì Chúa là đấng phép tắc và lòng lành vô cùng đã phán hứa sự ấy chẳng có lẽ nào sai được.  Amen.`,
    star: true
  },
  {
    name: 'Kinh Mến',
    content: `Lạy Chúa , con kính mến Chúa hết lòng hết sức trên hết mọi sự, vì Chúa là Đấng trọn tốt trọn lành vô cùng, lại vì Chúa, thì con thương yêu người ta như mình con vậy.  Amen.`,
    star: true
  },
  {
    name: 'Kinh Lạy Cha',
    content: `Lạy Cha chúng con ở trên trời, chúng con nguyện Danh Cha cả sáng, nước Cha trị đến, ý Cha thể hiện dưới đất cũng như trên trời.Xin Cha cho chúng con hôm nay lương thực hằng ngày, và tha nợ chúng con, như chúng con cũng tha kẻ có nợ chúng con. Xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi sự dữ. Amen`,
    star: true
  },
  {
    name: 'Kinh Kính Mừng',
    content: `Kính mừng Maria đầy ơn phúc Đức Chúa Trời ở cùng Bà, Bà có phúc lạ hơn mọi người nữ, và Giêsu con lòng Bà gồm phúc lạ.Thánh Maria Đức Mẹ Chúa Trời cầu cho chúng con là kẻ có tội khi này và trong giờ lâm tử. Amen`,
    star: true
  },

  {
    name: 'Kinh Tin Kính (ngắn)',
    content: `Tôi tin kính Đức Chúa Trời là Cha phép tắc vô cùng dựng nên trời đất.Tôi tin kính Đức Chúa Giêsu Kitô là Con Một Đức Chúa Cha cùng là Chúa chúng tôi; bởi phép Đức Chúa Thánh Thần mà Người xuống thai, sinh bởi Bà Maria đồng trinh: chịu nạn đời quan Phong-xi-ô Philatô, chịu đóng đanh trên cây Thánh-giá, chết và táng xác; xuống ngục tổ tông, ngày thứ ba bởi trong kẻ chết mà sống lại; lên trời ngự bên hữu Đức Chúa Cha phép tắc vô cùng; ngày sau bởi trời lại xuống phán xét kẻ sống và kẻ chết.Tôi tin kính Đức Chúa Thánh Thần. Tôi tin có Hội Thánh hằng có ở khắp thế này, các thánh thông công. Tôi tin phép tha tội. Tôi tin xác loài người ngày sau sống lại. Tôi tin hằng sống vậy. Amen`
  },
  {
    name: 'Kinh Tin Kính (dài)',
    content: `Tôi tin kính một Thiên Chúa là Cha toàn năng, Đấng tạo thành trời đất, muôn vật hữu hình và vô hình. Tôi tin kính một Chúa Giêsu Kitô, Con Một Thiên Chúa, sinh bởi Ðức Chúa Cha từ trước muôn đời.

  Người là Thiên Chúa bởi Thiên Chúa, Ánh Sáng bởi Ánh Sáng, Thiên Chúa thật bởi Thiên Chúa thật, được sinh ra mà không phải được tạo thành, đồng bản thể với Ðức Chúa Cha: nhờ Người mà muôn vật được tạo thành. Vì loài người chúng ta và để cứu độ chúng ta, Người đã từ trời xuống thế.
  
  Bởi phép Ðức Chúa Thánh Thần, Người đã nhập thể trong lòng Trinh Nữ Maria, và đã làm người.
  
  Người chịu đóng đinh vào thập giá vì chúng ta, thời quan Phongxiô Philatô; Người chịu khổ hình và mai táng, ngày thứ ba Người sống lại như lời Thánh Kinh. Người lên trời, ngự bên hữu Ðức Chúa Cha, và Người sẽ lại đến trong vinh quang để phán xét kẻ sống và kẻ chết, Nước Người sẽ không bao giờ cùng.
  
  Tôi tin kính Ðức Chúa Thánh Thần là Thiên Chúa và là Ðấng ban sự sống, Người bởi Ðức Chúa Cha và Ðức Chúa Con mà ra, Người được phụng thờ và tôn vinh cùng với Ðức Chúa Cha và Ðức Chúa Con: Người đã dùng các tiên tri mà phán dạy.
  
  Tôi tin Hội Thánh duy nhất, thánh thiện, công giáo và tông truyền.
  
  Tôi tuyên xưng có một Phép Rửa để tha tội.
  
  Tôi trông đợi kẻ chết sống lại và sự sống đời sau. Amen.`,
    star: true
  },
  {
    name: 'Kinh Ăn Năn Tội',
    content: `Lạy Chúa, Chúa là Đấng trọn tốt trọn lành vô cùng.  Chúa đã dựng nên con, và cho Con Chúa ra đời chịu nạn chịu chết vì con, mà con đã cả lòng phản nghịch lỗi nghĩa cùng Chúa, thì con lo buồn đau đớn, cùng chê ghét mọi tội con trên hết mọi sự, con dốc lòng chừa cải, và nhờ ơn Chúa, thì con sẽ lánh xa dịp tội, cùng làm việc đền tội cho xứng. Amen.`,
    star: true
  },
  {
    name: 'Kinh Phù Hộ',
    content: `Chúng con thờ lạy ngợi khen Chúa là Đấng có phép tắc vô cùng, đã thương để chúng con đến sớm mai nay, thì xin Chúa xuống ơn phù hộ cho chúng con trót ngày hôm nay, khỏi sa phạm tội gì. Lại xin Chúa sửa sự lo, lời nói, việc làm chúng con hằng nên trọn lành theo ý Chúa; vì công nghiệp Đức Chúa Giêsu, là Đấng hằng sống hằng trị cùng Đức Chúa Cha và Đức Chúa Thánh Thần đời đời chẳng cùng. Amen.`
  },
  {
    name: 'Kinh Đức Thánh Thiên Thần',
    content: `Con thân Đức Thánh Thiên Thần, tính thiêng liêng sáng láng, con cám ơn Đức Thánh Thiên Thần giữ con từ thuở mới sinh đến nay cho khỏi tay quỉ. Đức Thánh Thiên Thần là thầy con, mở lòng cho con biết được đạo thánh Chúa Trời đất. Vì vậy con cầu cùng Đức Thánh Thiên Thần giữ con ban ngày, xem con ban đêm, cho đến trọn đời, kẻo ma quỉ dữ cám dỗ được con. Con lạy Đức Thánh Thiên Thần khấn nguyện cho con thông minh sáng láng, giữ mười sự răn, chừa mọi sự dữ, đến khi con lâm chung, xin cùng Đức Chúa Trời cho linh hồn con được lên ở cùng Đức Chúa Trời và Thánh Thiên Thần hằng sống vui vẻ đời đời chẳng cùng. Amen.`
  },
  {
    name: 'Kinh Lạy nữ Vương',
    content: `Lạy Nữ Vương, Mẹ nhân lành làm cho chúng con được sống, được vui, được cậy. Thân lạy Mẹ! chúng con, con cháu E-và ở chốn khách đày kêu đến cùng bà, chúng con ở nơi khóc lóc than thở kêu khẩn bà thương. Hỡi Ôi! Bà là Chủ bầu chúng con, xin ghé mặt thương xem chúng con đến sau khỏi đày, xin cho chúng con được thấy Đức Chúa Giêsu con lòng Bà gồm phúc lạ Ôi khoan thay, nhân thay, dịu thay, Thánh Maria trọn đời đồng trinh. Amen`
  },
  {
    name: 'Kinh Vực Sâu',
    content: `Lạy Chúa, con ở dưới vực sâu kêu lên Chúa, xin Chúa hãy thương nhậm lời con kêu van, hãy lắng nghe tiếng con cầu xin. Nếu Chúa chấp tội, nào ai rỗi được? Bởi Chúa hằng có lòng lành, cùng vì lời Chúa phán hứa, con đã trông cậy Chúa. Linh hồn con cậy vì lời hứa ấy thì đã trông cậy Chúa. Những kẻ làm dân Đức Chúa Trời, đêm ngày hãy trông cậy Người cho liên, vì Người rất nhân lành hay thương vô cùng, sẽ tha hết mọi tội lỗi kẻ làm dân Người thay thảy.

  Lạy Chúa, xin ban cho các linh hồn (hoặc linh hồn ... ) được nghỉ ngơi đời đời, và được sáng soi vô cùng. Lạy Chúa, xin cứu lấy các linh hồn (hoặc linh hồn [...] ) cho khỏi tù ngục mà được nghỉ yên. Amen.
  
  Lạy ơn Đức Chúa Giêsu, Chúa đã phán dạy rằng, con hãy xin thì con sẽ được. Vậy con xin Chúa lòng lành vô cùng thương đến các linh hồn nơi luyện tội. Xin Chúa nghe lời con cầu xin kêu van, cho linh hồn ông bà, cha mẹ, anh em, bạn hữu con. Xin Chúa mở cửa thiên đàng cho các linh hồn ấy vào. Xin cho các linh hồn ấy được sự sống vô cùng hằng soi cho liên. Amen.`,
    star: true
  },
  {
    name: 'Kinh ơn chết lành',
    content: `Con lạy rất thánh Đức Bà Maria là Chúa bầu con, con tin thật Đức Chúa Trời Ngôi Thứ Nhất, là Đức Chúa Cha, có phép tắc vô cùng, đã ban cho Đức Bà được quyền phép cả trên trời dưới đất. Vì vậy con cầu cùng Đức Bà phù hộ cho con trong khi con lâm chung kẻo phải chước dữ kẻ nghịch thù con. Amen.

  Kính mừng …
  
  Con lạy ơn rất thánh Đức Bà Maria là Chúa bầu con, con tin thật Ngôi Thứ Hai, là Con Đức Chúa Trời cùng là Con một Đức Bà, đã ban cho Đức Mẹ cực quang cực minh soi sáng cả và thiên đàng. Vì vậy con cầu cùng Đức Bà phù hộ cho con trong khi con lâm chung, xin soi sáng cho linh hồn con được lòng tin thật cùng mạnh mẽ kẻo phải u mê, hay là tin chước dối kẻ nghịch thù con. Amen.
  
  Kính mừng …
  
  Con lạy ơn rất thánh Đức Bà Maria là Chúa bầu con, con tin thật Đức Chúa Trời Ngôi Thứ Ba, là Đức Chúa Thánh Thần, đã ban cho Đức Bà đầy lòng vui kính mến Đức Chúa Trời. Vì vậy con cầu cùng Đức Bà phù hộ cho con được lòng vui kính mến Đức Chúa Trời, trong khi con lâm chung cho con lấy sự khốn khó làm vui mừng. Amen.
  
  Kính mừng …`
  },
  {
    name: 'Kinh cám ơn',
    content: `Con cám ơn Đức Chúa Trời là Chúa lòng lành vô cùng chẳng bỏ con, chẳng để con không đời đời, mà lại sinh ra con, cho con được làm người, cùng hằng gìn giữ con, hằng che chở con, lại cho Ngôi Hai xuống thế làm người, chuộc tội chịu chết trên cây Thánh Giá vì con, lại cho con được đạo thánh Đức Chúa Trời, cùng chịu nhiều ơn nhiều phép Hội Thánh nữa, và đã cho phần xác con đêm nay (tối thì đọc: ngày hôm nay) được mọi sự lành; lại cứu lấy con kẻo phải chết tươi ăn năn tội chẳng kịp. Vậy các Thánh ở trên nước thiên đàng cám ơn Đức Chúa Trời thế nào, thì con cũng hợp cùng các Thánh mà dâng cho Chúa con cùng cám ơn như vậy. Amen.`,
    star: true
  },
  {
    name: 'Kinh Trông Cậy',
    content: `Chúng con trông cậy rất thánh Đức Mẹ Chúa Trời, xin chớ chê chớ bỏ lời con nguyện, trong cơn gian nan thiếu thốn, Đức Nữ Đồng Trinh hiển vinh sáng láng hằng chữa chúng con cho khỏi mọi sự dữ, Amen. 
   `,
    star: true
  },
  {
    name: '3 câu lạy',
    content: `
    Thưa: Lạy rất thánh Trái Tim Đức Chúa Giêsu.
    Đáp: Thương xót chúng con.
    
    Thưa: Lạy Trái Tim cực Thánh cực tịnh Rất Thánh Đức Bà Maria.
    Đáp: Cầu cho chúng con.
    
    Thưa: Lạy Ông thánh Giuse là bạn thanh sạch Đức Bà Maria trọn đời đồng trinh.
    Đáp: Cầu cho chúng con.
    
    Thưa: Các Thánh Tử Vì Đạo nước Việt Nam.
    Đáp: Cầu cho chúng con.
    
    Thưa: Nữ Vương ban sự bằng an.
    Đáp: Cầu cho chúng con.`,
    star: true
  },
  {
    name: 'Kinh Nghĩa Đức Tin',
    content: `Ngày Chúa Nhật hôm nay (hay lễ trọng nào thì đọc: ngày lễ [...]), chúng con hợp nhau kính lạy thờ phượng Chúa, khong khen cảm tạ ơn Chúa về mọi ơn lành Chúa đã ban cho chúng con, và phạt tạ Chúa vì những tội lỗi chúng con đã phạm mất lòng Chúa: thì chúng con dám xin Chúa hãy khấng ban những ơn cần kíp cho chúng con được rỗi linh hồn. Nên chúng con cả lòng tin vững vàng mọi điều đạo thánh Chúa dạy; nhất là những điều cần kíp này: là có một Đức Chúa Trời phép tắc vô cùng dựng nên trời đất; mà Người có Ba Ngôi: Ngôi Thứ Nhất là Cha, Ngôi Thứ Hai là Con, Ngôi Thứ Ba là Thánh Thần; Ba Ngôi cũng một tính một phép cho nên Ba Ngôi cũng một Chúa mà thôi. Chúng con tin Ngôi Thứ Hai ra đời làm người sinh bởi Bà Maria đồng trinh, đặt tên là Giêsu; ở thế gian ba mươi ba năm, đoạn chịu chết trên cây thánh giá mà chuộc tội cho thiên hạ; đến ngày thứ ba Người sống lại; khỏi bốn mươi ngày lên trời đủ mười ngày lại cho Đức Chúa Thánh Thần xuống trên các Thánh Tông Đồ và Hội Thánh mới lập; ai chẳng thông công cùng Hội Thánh ấy thì chẳng được rỗi linh hồn; mà linh hồn là giống thiêng liêng chẳng hề chết được; và đến ngày tận thế xác loài người ta sẽ sống lại mà chịu phán xét, kẻ lành lên thiên đàng hưởng phúc đời đời; kẻ dữ sa hỏa ngục chịu phạt vô cùng.

    Mà chúng con tin các sự ấy mà thôi thì chưa đủ cho được lên thiên đàng; song phải giữ Mười Điều Răn Đức Chúa Trời cùng Sáu Luật Điều Hội Thánh, và làm những việc lành phúc đức. Nhân vì sự ấy chúng con hằng phải sợ hãi và trốn tránh các tội lỗi, nhất là bảy mối tội đầu, là căn nguyên mọi tội lỗi khác.
    
    Vậy chúng con phải ân cần lo lắng mà năng chịu các phép Bí Tích Đức Chúa Giêsu đã truyền, là những phương linh nghiệm cho chúng con được nên thánh. Có bảy phép Bí Tích mà thôi; song phép Rửa Tội, phép Mình Thánh Chúa cùng phép Giải Tội là ba phép cần kíp hơn cho chúng con được rỗi. Ấy vậy chúng con hằng phải ra sức lo lắng thể nào mà chịu các phép trọng ấy cho nên, cùng tin thật vững vàng mà giữ cẩn thận các điều trước này, thì mới được hưởng phúc thanh nhàn đời đời kiếp kiếp. Amen.`
  },
  {
    name: 'Kinh Mười Điều Răn',
    content: `
    Đạo Đức Chúa Trời có mười điều răn:

Thứ nhất: Thờ phượng một Đức Chúa Trời và kính mến Người trên hết mọi sự.
Thứ hai: Chớ kêu tên Đức Chúa Trời vô cớ.
Thứ ba: Giữ ngày Chúa nhật.
Thứ bốn: Thảo kính cha mẹ.
Thứ năm: Chớ giết người.
Thứ sáu: Chớ làm sự dâm dục.
Thứ bảy: Chớ lấy của người.
Thứ tám: Chớ làm chứng dối.
Thứ chín: Chớ muốn vợ chồng người.
Thứ mười: Chớ tham của người.

Mười điều răn ấy tóm về hai điều này mà chớ:
Trước kính mến một Đức Chúa Trời trên hết mọi sự,
sau lại yêu người như mình ta vậy.
AMEN.
`,
    star: true
  },
  {
    name: 'Kinh 6 điều luật hội thánh',
    content: `  Hội thánh có sáu điều răn:

    Thứ nhất, xem lễ ngày Chủ nhật, cùng các ngày lễ buộc.
    Thứ hai, chớ làm việc xác ngày Chủ nhật cùng các ngày lễ buộc.
    Thứ ba, xưng tội trong một năm ít là một lần.
    Thứ bốn, chịu Mình Thánh Đức Chúa Giêsu trong mùa Phục Sinh.
    Thứ năm, giữ chay những ngày Hội Thánh buộc.
    Thứ sáu, kiêng thịt ngày thứ sáu, cùng những ngày khác Hội Thánh dạy.`,
    star: true
  },
  {
    name: `Kinh Bảy Phép Bí Tích`,
    content: `Đạo Đức Chúa Trời có bảy phép Bí-tích:

    Thứ nhất: là phép Rửa tội.
    Thứ hai: là phép Thêm sức.
    Thứ ba: là phép Mình Thánh Chúa.
    Thứ bốn: là phép Giải tội.
    Thứ năm: là phép Xức dầu thánh.
    Thứ sáu: là phép Truyền chức thánh.
    Thứ bảy: là phép Hôn-phối.`,
    star: true
  },
  {
    name: 'Kinh Mười Bốn Mối',
    content: `Thương người có mười bốn mối

Thương xác bảy mối:

Thứ nhất, cho kẻ đói ăn.
Thứ hai, cho kẻ khát uống.
Thứ ba, cho kẻ rách rưới ăn mặc.
Thứ bốn, viếng kẻ liệt cùng kẻ tù rạc.
Thứ năm, cho khách đỗ nhà.
Thứ sáu, chuộc kẻ làm tôi.
Thứ bảy, chôn xác kẻ chết.

Thương linh hồn bảy mối:

Thứ nhất, lấy lời lành mà khuyên người.
Thứ hai, mở dậy kẻ mê muội.
Thứ ba, yên ủi kẻ âu lo.
Thứ bốn, răn bảo kẻ có tội.
Thứ năm, tha kẻ dể ta.
Thứ sáu, nhịn kẻ mất lòng ta.
Thứ bảy, cầu cho kẻ sống và kẻ chết.`
  },
  {
    name: 'Kinh Cải Tội Bảy Mối',
    content: `Cải tội bảy mối có bảy đức:

    Thứ nhất: Khiêm nhường, chớ kiêu ngạo.
    Thứ hai: Rộng rãi, chớ hà tiện.
    Thứ ba: Giữ mình sạch sẽ, chớ mê dâm dục.
    Thứ bốn: Hay nhịn, chớ hờn giận.
    Thứ năm: Kiêng bớt, chớ mê ăn uống.
    Thứ sáu: Yêu người, chớ ghen ghét.
    Thứ bảy: Siêng năng việc Đức Chúa Trời, chớ làm biếng.`
  },
  {
    name: 'Kinh Phúc Thật Tám Mối',
    content: `Phúc thật tám mối:

    Thứ nhất: ai có lòng khó khăn, ấy là phúc thật, vì chưng nước Đức Chúa Trời là của mình vậy. 

    Thứ hai: ai hiền lành, ấy là phúc thật, vì chưng sẽ được đất Đức Chúa Trời làm của mình vậy.

    Thứ ba: ai khóc lóc, ấy là phúc thật, vì chưng sẽ được an ủi vậy.

    Thứ bốn: ai khao khát nhân đức trọn lành, ấy là phúc thật, vì chưng sẽ được no đủ vậy.

    Thứ năm: ai thương xót người, ấy là phúc thật, vì chưng mình sẽ được thương xót vậy.

    Thứ sáu: ai giữ lòng sạch sẽ, ấy là phúc thật, vì chưng sẽ được thấy mặt Đức Chúa Trời vậy.

    Thứ bảy: ai làm cho người hòa thuận, ấy là phúc thật, vì chưng sẽ được gọi là con Đức Chúa Trời vậy.

    Thứ tám: ai chịu khốn nạn vì đạo ngay, ấy là phúc thật, vì chưng nước Đức Chúa Trời là của mình vậy.`,
    star: true
  },
 
  {
    name: ' NĂM SỰ VUI',
    content: `Thứ nhất: Thiên Thần truyền tin cho Đức Bà chịu thai. Ta hãy xin cho được ở khiêm nhường.

    Thứ hai: Đức Bà đi viếng Bà thánh Isave. Ta hãy xin cho được lòng yêu người.
    
    Thứ ba: Đức Bà sinh Đức Chúa Giêsu nơi hang đá. Ta hãy xin cho được lòng khó khăn.
    
    Thứ tư: Đức Bà dâng Đức Chúa Giêsu trong Đền Thánh. Ta hãy xin cho được vâng lời chịu lụy.
    
    Thứ năm: Đức Bà tìm được Đức Chúa Giêsu trong Đền Thánh. Ta hãy xin cho được giữ nghĩa cùng Chúa luôn.`,
    star: true
  },
  {
    name: 'Năm Sự Thương',
    content: `NĂM SỰ THƯƠNG

    Thứ nhất: Đức Chúa Giêsu lo buồn đổ mồ hôi máu. Ta hãy xin cho được ăn năn tội nên.
    
    Thứ hai: Đức Chúa Giêsu chịu đánh đòn. Ta hãy xin cho được hãm mình chịu khó bằng lòng.
    
    Thứ ba: Đức Chúa Giêsu chịu đội mão gai. Ta hãy xin cho được chịu mọi sự sỉ nhục bằng lòng.
    
    Thứ tư: Đức Chúa Giêsu vác cây Thánh Giá. Ta hãy xin cho được vác Thánh Giá theo chân Chúa.
    
    Thứ năm: Đức Chúa Giêsu chịu chết trên cây Thánh Giá. Ta hãy xin cho được đóng đinh tính xác thịt vào Thánh Giá Chúa.`,
    star: true
  },
  {
    name: 'Năm Sự Mừng',
    content: `NĂM SỰ MỪNG

    Thứ nhất: Đức Chúa Giêsu sống lại. Ta hãy xin cho được sống lại thật về phần linh hồn.
    
    Thứ hai: Đức Chúa Giêsu lên trời. Ta hãy xin cho được lòng ái mộ những sự trên trời.
    
    Thứ ba: Đức Chúa Thánh Thần hiện xuống. Ta hãy xin cho được lòng đầy dẫy mọi ơn Đức Chúa Thánh Thần.
    
    Thứ tư: Đức Chúa Trời cho Đức Bà lên trời. Ta hãy xin ơn chết lành trong tay Đức Mẹ.
    
    Thứ năm: Đức Chúa Trời thưởng Đức Mẹ trên trời. Ta hãy xin Đức Mẹ phù hộ cho ta được thưởng cùng Đức Mẹ trên nước thiên đàng.
    `,
    star: true
  },
  {
    name: 'Năm Sự Sáng',
    content: `NĂM SỰ SÁNG

    Thứ nhất: Đức Chúa Giêsu chịu phép Rửa tại sông Giođan. Ta hãy xin cho được sống xứng đáng là con cái Chúa.
    
    Thứ hai: Đức Chúa Giêsu dự tiệc cưới Cana. Ta hãy xin cho được vững tin vào quyền năng của Ngài.
    
    Thứ ba: Đức Chúa Giêsu rao giảng Nước Trời và kêu gọi sám hối. Ta hãy xin cho được hoán cải và đón nhận Tin Mừng.
    
    Thứ tư: Đức Chúa Giêsu biến hình trên núi. Ta hãy xin cho được lắng nghe và thực hành lời Chúa.
    
    Thứ năm: Đức Chúa Giêsu lập bí tích Thánh Thể. Ta hãy xin cho được năng kết hợp cùng Chúa Giêsu Thánh Thể.`,
    star: true
  },
  {
    name: 'KINH CẦU ÔNG THÁNH GIUSE',
    content: `Xin Chúa thương xót chúng con.

    – Xin Chúa thương xót chúng con.
    
    Xin Chúa Kitô thương xót chúng con.
    
    – Xin Chúa Kitô thương xót chúng con.
    
    Xin Chúa thương xót chúng con.
    
    – Xin Chúa thương xót chúng con.
    
    Chúa Kitô nghe cho chúng con.
    
    – Chúa Kitô nhận lời chúng con.
    
    Đức Chúa Cha ngự trên trời là Đức Chúa Trời thật.
    
    – Thương xót chúng con.
    
    (Ba câu sau cũng thưa như vậy)
    
    Đức Chúa Con chuộc tội cứu thế là Đức Chúa Trời thật.
    
    Đức Chúa Thánh Thần là Đức Chúa Trời thật.
    
    Ba Ngôi cũng là một Đức Chúa Trời.
    
    Rất Thánh Đức Bà Maria.
    
    – Cầu cho chúng con.
    
    (Các câu sau cũng thưa như vậy).
    
    Ông thánh Giuse.
    
    Ông thánh Giuse là dòng dõi sang trọng vua Đavít.
    
    Ông thánh Giuse là đấng sáng láng trên hết các thánh Tổ tông.
    
    Ông thánh Giuse là bạn Đức Mẹ Đức Chúa Trời.
    
    Ông thánh Giuse là Đấng gìn giữ Chúa Cứu Thế
    
    Ông thánh Giuse là đấng đồng trinh gìn giữ Đức Nữ Đồng Trinh.
    
    Ông thánh Giuse là cha nuôi Con Đức Chúa Trời.
    
    Ông thánh Giuse hằng lo lắng che chở Đức Chúa Giêsu liên.
    
    Ông thánh Giuse luôn ân cần phục vụ Chúa Kitô.
    
    Ông thánh Giuse cộng tác vào công cuộc cứu độ loài người.
    
    Ông thánh Giuse làm đầu Thánh gia.
    
    Ông thánh Giuse trọn tốt trọn lành.
    
    Ông thánh Giuse cực thanh cực tịnh.
    
    Ông thánh Giuse cực khôn cực ngoan.
    
    Ông thánh Giuse là đấng kiên tâm mạnh mẽ mọi đàng.
    
    Ông thánh Giuse hay vâng lời chịu lụy cho trọn.
    
    Ông thánh Giuse là đấng ngay chính tận trung.
    
    Ông thánh Giuse là gương nhân đức nhịn nhục.
    
    Ông thánh Giuse yêu chuộng nhân đức khó khăn.
    
    Ông thánh Giuse là gương tốt lành cho các kẻ làm thợ phải soi.
    
    Ông thánh Giuse là mẫu mực sáng láng về cách ăn nết ở trong nhà.
    
    Ông thánh Giuse gìn giữ các kẻ đồng trinh.
    
    Ông thánh Giuse là như cột trụ cho mọi nhà được vững.
    
    Ông thánh Giuse là nơi nương tựa lúc gặp nguy nan.
    
    Ông thánh Giuse yên ủi kẻ gian nan khốn khó.
    
    Ông thánh Giuse làm cho kẻ bệnh tật được cậy trông.
    
    Ông thánh Giuse là Đấng Bảo trợ kẻ lưu đày.
    
    Ông thánh Giuse là Đấng Bảo trợ người sầu khổ.
    
    Ông thánh Giuse là Đấng Bảo trợ kẻ túng nghèo.
    
    Ông thánh Giuse là quan thày phù hộ kẻ mong sinh thì.
    
    Ông thánh Giuse các ma quỷ kinh khiếp.
    
    Ông thánh Giuse là đấng bảo hộ cả và Hội thánh.
    
    Chúa Giêsu chuộc tội cứu thế.
    
    – Chúa tha tội chúng con.
    
    Chúa Giêsu chuộc tội cứu thế.
    
    – Chúa nhận lời chúng con.
    
    Chúa Giêsu chuộc tội cứu thế.
    
    – Chúa thương xót chúng con.
    
    Chúa đã đặt ông thánh Giuse làm chủ nhà Chúa.
    
    – Cùng cai quản gia nghiệp Chúa.
    
    Lời nguyện
    
          Chúng con lạy ơn Đức Chúa Giêsu bởi lòng thương vô cùng đã chọn lấy ông thánh Giuse làm bạn cùng Rất Thánh Đức Mẹ Chúa; chúng con kính chuộng ông thánh Giuse là quan thày phù hộ cho chúng con ở dưới đất, thì xin Chúa ban cho chúng con được đáng ăn mày quyền thế Người cầu bầu cho chúng con ở trên trời. Amen.`
  },
  {
    name: 'KINH CÁM ƠN RƯỚC LỄ 3 PHẦN (CHỊU LỄ)',
    content: `Phần thứ nhất là cám ơn
    Lạy ơn Đức Chúa Giê su lòng lành vô cùng, đã thương nhớ đến con hèn mọn này, mà cho con được chịu ơn cực trọng là Mình thật máu thật chúa thì hôm nay con biết tỏ tường sự rộng rãi Chúa là dường nào, vì con là kẻ có tội đáng sa hỏa ngục, mà Chúa chẳng chấp sự tội lỗi con, cũng chẳng xem sao sự dơ dáy trong linh hồn con, cùng cho kẻ khó khăn này được no đầy, thì con đội ơn Chúa hết lòng hết sức, vì ơn cực trọng này cùng mọi ơn khác đã xuống cho con xưa nay từ khi Chúa dựng nên con cho đến rầy. Chớ gì từ rầy về sau lòng con cùng miệng lưỡi con, chớ tưởng cùng nói nhời gì chẳng nên nữa, một đội ơn cùng ngợi khen chúa mà thôi; song le sức con là bao nhiêu mà cám ơn cho đủ, thì con xin các thánh thiên thần cùng các thánh nam nữ ở trên giời đội ơn Chúa thay vì con.
    Phần thứ 2 là dâng
    Con lạy ơn Chúa, đã làm cho con được nhiều ơn cùng trọng dường ấy, thì bây giờ con chẳng biết lấy gì mà dâng cho đẹp lòng Chúa; lẽ thì lòng con đây những sự kính mến như các thánh thiên thần Sera phim; trí con đầy những sự sáng láng bằng các thánh thiên thần Kêrubim; cùng linh hồn con đầy những sự phúc thật như các thánh nam nữ ở trên giời mà dâng cho Chúa, song le con là kẻ khó khăn thiếu mọi sự, trong ngoài chẳng có của gì mà dâng, thì con lại lấy những của Chúa đã ban cho con mà dâng vậy. Lạy Chúa, này lòng con, này trí khôn con, này xác con, này linh hồn con, cùng mọi sự con, xin Chúa phú quí vô cùng hãy chịu lấy của hèn mọn này, mà cho con được làm con thật Chúa, cho con tự rày về sau được lòng kính mến Chúa trên hết mọi sự.
    Phần thứ ba là cầu xin
    Con lạy ơn Chúa sinh nên muôn vật, đã tỏ lòng rộng rãi ra cùng con làm vậy, thì con xin Chúa rất nhân lành vô cùng, trước hết tha mọi tội lỗi cho con, vì con đã biết thật tự khi con người mới có trí khôn cho đến rầy, chưa được ngày nào giữ nghĩa cùng chúa cho nên, những là làm sự nghịch cùng mất lòng Chúa mà thôi. Lại xin Chúa xuống ơn cho con được sức mạnh mà đi đàng thật, cùng giữ những nhời Chúa đã phán dạy. Sau nữa xin Chúa rất nhân lành vô cùng, thương đến linh hồn cha mẹ, an hem họ hàng, bạn hữu con, cùng xin cho kẻ làm ơn lành cho con và các kẻ nghịch cùng con hoặc còn sống hoặc đã qua đời được mọi sự lành. Lại xin cho nước Việt Nam chúng con cùng cả và thiên hạ biết đạo Chúa mà thờ phượng, cùng kính mến Chúa trên hết mọi sự cho ngày sau được lên xem thấy mặt Chúa đời đời ở trên giời. Amen.`
  },
  {
    name: 'Kinh trước khi xét mình',
    content: `Lạy Chúa là sự sáng linh hồn con, xin soi sáng cho con được biết mọi tội con đã phạm trong ngày hôm nay, hoặc lo, hoặc nói, hoặc làm điều gì lỗi nghĩa cùng Chúa. Con lại xin Chúa vì công nghiệp Đức Chúa Giêsu ban ơn cho con được ăn năn ghét tội cùng dốc lòng chừa thật. Amen`
  },
  {
    name: 'Kinh Phó Dâng',
    content: `Lạy Chúa, con xin phó dâng linh hồn và xác con ở tay Chúa con. Chúa đã phù hộ con ban ngày, thì xin Chúa cũng gìn giữ con ban đêm, kẻo sa phạm tội gì mất lòng Chúa hay là chết tươi ăn năn tội chẳng kịp. Chớ gì sống chết con được giữ một lòng kính mến Chúa luôn. Amen.`
  },
  {
    name: 'Kinh Hãy Nhớ',
    content: `Lạy Thánh Nữ Đồng Trinh Maria, là Mẹ rất nhân từ, xin hãy nhớ xưa nay chưa từng nghe có người nào chạy đến cùng Ðức Mẹ, xin bầu chữa cứu giúp mà Ðức Mẹ từ bỏ chẳng nhận lời. Nhân vì sự ấy, con lấy lòng trông cậy than van chạy đến sấp mình xuống dưới chân Ðức Mẹ là Nữ Đồng Trinh trên hết các kẻ đồng trinh, xin Ðức Mẹ đoái đến con là kẻ tội lỗi . Lạy Mẹ là Mẹ Chúa Cứu Thế, xin chớ bỏ lời con kêu xin, một dủ lòng thương mà nhận lời con cùng. Amen`
  },
  {
    name: 'Kinh quan thầy -  ÔNG THÁNH GIOAN BAOTIXITA',
    content: `Lạy ông thánh Gioan Baotixita,/ là đấng trọng hơn các Thánh tiên tri / cùng là kẻ Đức Chúa Giêsu đã khen rằng:/ trong các người nam bởi người nữ mà sinh ra,/ thì chẳng có ai trọng hơn Gioan Baotixita./

 

    Chúng con xin ông thánh Gioan Baotixita cầu cho chúng con./ Đáng chịu lấy những sự Chúa Kitô đã hứa./
    
     
    
    Lạy Đức Chúa Trời đã ban cho chúng con được kính mừng (Nếu là ngày 24/6 thì đọc thêm: ngày hôm nay là sinh nhật) Ông thánh Gioan Baotixita,/ thì chúng con xin Đức Chúa Trời ban cho các dân người,/ được hưởng những sự vui mừng thiêng liêng / bởi ơn thánh sủng mà ra,/ cùng dẫn linh hồn các bổn đạo vào đàng rỗi mà nghỉ vô cùng./ Vì Đức Chúa Giêsu Kitô là Chúa chúng con./ Amen.`
  }
]
function _formatString(str: string) {
  return str.
    toLowerCase()
    .replace(/à|á|á|ạ|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|á/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ọ|ơ|ờ|ớ|ợ|ở|ỡ|ờ|ờ|ò/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ũ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
}


export default function Home() {

  const [search, s] = useState<string>('')
  const { colorMode } = useColorMode()

  const list = BibleList.map((b, index) => ({ ...b, index }))

  const filter_by_search = (v: string) => {
    const a = _formatString(v)
    const b = _formatString(search)
    console.log({ a }, b)
    return a.includes(b)
  }

  return (
    <VStack spacing='5' pt='10'>
       <ScrollToTop smooth color="teal" />
      <ChangeColorMode />
      <Card w='full'>
        <CardHeader p='5' pb='0'>
          <VStack spacing='3'>
            <Center><Heading size='md'>Danh sách các kinh cần học </Heading></Center>
            <SearchBox onChange={s} />
          </VStack>
        </CardHeader>

        <CardBody>
          <VStack w='full' spacing='5'>
            {
              list
                .filter(v => search ? filter_by_search(v.name) : true)
                .map(({ name, star, index }) => (
                  <HStack w='full' key={name}>
                    <Link href={`#index-${index}`} id={`menu-${index}`}>
                      <HStack w='full'>
                        <Tag >{index + 1}</Tag>
                        <Text color={star ? 'orange' : (colorMode == 'dark' ? 'white' : 'black')} textAlign='left'>
                          {name}
                        </Text>
                        {star && <AiFillStar color='orange' size='25' />}
                      </HStack>
                    </Link>
                  </HStack>


                ))
            }
          </VStack>
        </CardBody>
      </Card>

      {
        list
          .map(({ content, name, index }) => (
            <Card w='full' >
              <a id={`index-${index}`} />
              <CardHeader p='5' pb='0'>
                <HStack w='full' justify='space-between'>
                  <HStack>
                    <Tag>{index + 1}</Tag>
                    <Heading size='md'>{name}</Heading>
                  </HStack>
                </HStack>
              </CardHeader>

              <CardBody>
                <VStack spacing='5'>
                  <Box>
                    <pre style={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                      letterSpacing: 'normal',
                      lineHeight: 2
                    }}>
                      {content}
                    </pre>
                  </Box>
                  <Link href={`#menu-${index}`}>
                    <Button leftIcon={<BiSolidUpvote />} size='xs'>Lên trên</Button>
                  </Link>
                </VStack>

              </CardBody>
            </Card>
          ))
      }
    </VStack>
  )
}
