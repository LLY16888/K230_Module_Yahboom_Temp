//% blockId=k230_models block="k230_models"
//%color="#FF7F24" weight=25 icon="\uf06e"
namespace k230_models {

    let datax=0,datay=0,dataw=0,datah=0,id=0,degrees=0,score=0; //number
    let class_num = 0; //例程号 number
    let msg='',name='',category=''; //string

    //% block="init_SerialPort"
    export function initialization () {
        serial.redirect(
        SerialPin.P1,
        SerialPin.P2,
        BaudRate.BaudRate115200
        )
    }

    //% blockId=setRXbuffSize block="Set RXbuffSize|size %size"
    //% weight=88
    //% blockGap=10
    export function setRXbuffSize(size:number)
    {
        serial.setRxBufferSize(size)
    }
    
    //% blockId=setTXbuffSize block="Set TXbuffSize|size %size"
    //% weight=88
    //% blockGap=10
    export function setTXbuffSize(size:number)
    {
        serial.setTxBufferSize(size)
    }

    

    function clean_data()
    {
        datax=datay=dataw=datah=id=degrees=score=-1
        class_num =0
        msg = ''
        name= ''
        category=''
    }

    //% blockId=mySerial_Deal block="Serial Data Deal"
    //% weight=88
    //% blockGap=10
    export function mySerial_Deal()
    {
        let length = 0
        let opo = ""
        let numdata: string[]
        opo = serial.readUntil(serial.delimiters(Delimiters.Hash))
        length = opo.length
        if (opo[0] != "$") 
        {
            opo = ''
            clean_data()
            return
        }

        numdata = _py.py_string_split(opo.slice(1, length), ",")
        const dataLength = parseInt(numdata[0]) 

        class_num = parseInt(numdata[1]) 
        

        //数据长度整体判断
        if (dataLength  != length+1)
        {
            opo = ''
            clean_data()
            return
        }

        //这里添加例程号判断
        if((class_num <=11 )||( class_num ==14)||(class_num == 15))
        {
            datax = parseInt(numdata[2])
            datay = parseInt(numdata[3])
            dataw = parseInt(numdata[4])
            datah = parseInt(numdata[5])

            if((class_num ==2 )||( class_num ==3)||(class_num == 14))
            {
                msg = numdata[6]
            }
            else if(class_num ==4 )
            {
                id = parseInt(numdata[6])
                degrees = parseInt(numdata[7])
            }
            else if(class_num ==5)
            {
                msg = numdata[6]
                degrees = parseInt(numdata[7])
            }
            else if((class_num ==8))
            {
                name = numdata[6]
                score = parseInt(numdata[7])
            }
            else if((class_num ==10))
            {
                msg = numdata[6]
                score = parseInt(numdata[7])
            }

        

        }
        else//这里只有信息
        {
            if((class_num ==12)||(class_num ==13)||(class_num ==17))
            {
                msg = numdata[2]
            }
            else if(class_num ==16)
            {
                category = numdata[2]
                score = parseInt(numdata[3])
            }
            
        }
       opo = '' //最后清空下信息

    }

    //% blockId=color_reg_X block="reg_X return"
    //% weight=88
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function color_reg_X(): number{
        let x = -1
        if((class_num <=11 )||( class_num ==14)||(class_num == 15))
        {
            x = datax 
        }
        return x

    }

    //% blockId=color_reg_Y block="reg_Y return"
    //% weight=88
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function color_reg_Y(): number{
        let y = -1
        if((class_num <=11 )||( class_num ==14)||(class_num == 15))
        {
            y = datay 
        }
        return y
        

    }

    //% blockId=color_reg_W block="reg_W return"
    //% weight=88
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function color_reg_W(): number{
        let w = -1
        if((class_num <=11 )||( class_num ==14)||(class_num == 15))
        {
            w = dataw 
        }
        return w

    }    

    //% blockId=color_reg_H block="reg_H return"
    //% weight=88
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function color_reg_H(): number{
        let h = -1
        if((class_num <=11 )||( class_num ==14)||(class_num == 15))
        {
            h = datah 
        }
        return h

    }



    //% blockId=Barcode_Sensor block="Barcode scan return"
    //% weight=88
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Barcode_Sensor(): string {
        let apriltag = "-1"
        if(class_num == 2)
        {
            apriltag = msg
        }
        return apriltag
    }

    //% blockId=QRcode_Sensor block="QRcode scan return"
    //% weight=88
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function QRcode_Sensor(): string {
        let apriltag = "-1"
        if(class_num == 3)
        {
            apriltag = msg
        }
        return apriltag

    }
    
    //% blockId=Apriltag_Sensor_ID block="Apriltag ID return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function Apriltag_Sensor_ID(): number {
        let Apriltagid = -1
       
        if(class_num == 4)
        {
            Apriltagid = id
        }
        return Apriltagid

    }

    //% blockId=Apriltag_Sensor_Degrees block="Apriltag Degrees return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function Apriltag_Sensor_Degrees(): number {
        let Apriltag_degrees = -1
        if(class_num == 4)
        {
            Apriltag_degrees = degrees
        }
        return Apriltag_degrees

    }


    //% blockId=DM_Sensor_Msg block="DM Msg return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function DM_Sensor_Msg(): string {
        let DMMsg = '-1'
       
        if(class_num == 5)
        {
            DMMsg = msg
        }
        return DMMsg

    }

    //% blockId=DM_Sensor_Degrees block="DM Degrees return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function DM_Sensor_Degrees(): number {
        let DM_degrees = -1
        if(class_num == 5)
        {
            DM_degrees = degrees
        }
        return DM_degrees

    }





    //% blockId=face_reg_name block="face name return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function face_reg_name():string{
        let facename = "-1"
        if(class_num == 8)
        {
            facename = name
        }
        return facename

    }

    //% blockId=face_reg_score block="face score return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function face_reg_score():number{
        let facescore = -1
        if(class_num == 8)
        {
            facescore = score
        }
        return facescore

    }


    //% blockId=falldown_detect_msg block="falldown msg return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function falldown_detect_msg():string{
        let fallmsg = "-1"
        if(class_num == 10)
        {
            fallmsg = msg
        }
        return fallmsg

    }


    //% blockId=falldown_detect_score  block="falldown score return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function falldown_detect_score():number{
        let fallscore = -1
        if(class_num == 10)
        {
            fallscore = score
        }
        return fallscore

    }


    //% blockId=gesture_detect block="gesture detect return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function gesture_detect():string{
        let gesturemsg = "-1"
        if(class_num == 12)
        {
            gesturemsg = msg
        }
        return gesturemsg
    }


    //% blockId=OCRChar_detect block="OCRChar detect return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function OCRChar_detect():string{
        let OCRmsg = "-1"
        if(class_num == 13)
        {
            OCRmsg = msg
        }
        return OCRmsg
    }

    //% blockId=Object_detect block="Object detect return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function Object_detect():string{
        let Objectmsg = "-1"
        if(class_num == 14)
        {
            Objectmsg = msg
        }
        return Objectmsg
    }


    //% blockId=self_learning_category  block="learning category return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function self_learning_category():string{
        let selfcategory = "-1"
        if(class_num == 16)
        {
            selfcategory = category
        }
        return selfcategory
    }

    //% blockId=self_learning_score block="learning score return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function self_learning_score():number{
        let selfscore = -1
        if(class_num == 16)
        {
            selfscore = score
        }
        return selfscore
    }

    //% blockId=licence_rec block="licence rec return"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=30
    export function licence_rec():string{
        let licencemsg = "-1"
        if(class_num == 17)
        {
            licencemsg = msg
        }
        return licencemsg
    }



}