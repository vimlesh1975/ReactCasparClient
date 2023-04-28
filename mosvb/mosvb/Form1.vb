Imports System.ComponentModel
Imports System.IO
Imports System.Net.Sockets
Imports System.Text
Imports System.Threading
Imports System.Xml
Imports System.Xml.Serialization
Imports mosvb.mosprotocol

Public Class Form1
    Dim mosClient As New TcpClient


    Dim stream As NetworkStream
    Private receiveThread As Thread
    Dim encodingValue As String = "utf-16BE"
    Dim encoding As Encoding = Encoding.GetEncoding(encodingValue)

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Dim allEncodings() As EncodingInfo = Encoding.GetEncodings()


        ' connect()

        With DataGridView1
            .Rows.Add(4)
            .Rows(0).Cells(0).Value = "SANDEEP KARAN SINGH"
            .Rows(1).Cells(0).Value = "EMAD HAMED NOUR"
            .Rows(2).Cells(0).Value = "NITIN V SUMANTH"
            .Rows(3).Cells(0).Value = "MOHAMAD ALGARNI"
        End With


    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' On Error Resume Next
        Dim heartbeat As cHeartBeat = New cHeartBeat()
        heartbeat.time = DateTime.Now
        Dim mos As cMOS = New cMOS()
        mos.messageID = 333
        mos.mosID = txtmosID.Text
        mos.ncsID = "NCS_RCC"
        mos.heartbeat = heartbeat
        mos.pageName = txtPageName.Text
        mos.layerNumber = 96
        mos.type = "cgPlay"

        Dim dataList As New List(Of cData)()
        Dim data1 As New cData()
        data1.key = "f0"
        data1.value = DataGridView1.CurrentRow.Cells(0).Value
        data1.type = "text"
        dataList.Add(data1)

        Dim data2 As New cData()
        data2.key = "f1"
        data2.value = DataGridView1.Rows(DataGridView1.CurrentRow.Index + 1).Cells(0).Value
        data2.type = "text"
        dataList.Add(data2)

        mos.dataList = dataList


        Dim settings As XmlWriterSettings = New XmlWriterSettings()
        settings.Encoding = encoding
        Dim xml As XmlSerializer = New XmlSerializer(GetType(cMOS))
        Dim ms As MemoryStream = New MemoryStream()
        Dim writer As XmlWriter = XmlWriter.Create(ms, settings)
        xml.Serialize(writer, mos)
        Try
            If mosClient.Connected Then
                mosClient.GetStream().Write(ms.GetBuffer(), 0, CInt(ms.Length))

                If stream.DataAvailable Then
                    Dim responseData As Byte() = New Byte(1024) {}
                    Dim response As String = ""
                    Dim bytes As Integer = stream.Read(responseData, 0, responseData.Length)

                    response = encoding.GetString(responseData, 0, bytes)
                    Dim updateLabelDelegate As UpdateLabelDelegate = New UpdateLabelDelegate(AddressOf UpdateLabel)

                    Label4.Invoke(updateLabelDelegate, "Received response: " + response)
                End If

            End If
        Catch ex As Exception

        End Try
    End Sub

    Private Sub cmdConnect_Click(sender As Object, e As EventArgs) Handles cmdConnect.Click
        'On Error Resume Next
        connect()

    End Sub
    Sub connect()
        Try
            If mosClient.Connected Then
                receiveThread.Abort()
                stream.Close()
                mosClient.Close()

                cmdConnect.BackColor = Color.Red
                mosClient = New TcpClient

            Else
                mosClient = New TcpClient(cmbHost.Text, ComboBox1.Text)
                cmdConnect.BackColor = Color.Green
                stream = mosClient.GetStream()
                receiveThread = New Thread(AddressOf ReceiveData)
                receiveThread.Start()

            End If
        Catch ex As Exception

        End Try
    End Sub

    ' Define a delegate that matches the signature of the method that updates the label
    Delegate Sub UpdateLabelDelegate(ByVal text As String)

    ' Define the method that updates the label
    Sub UpdateLabel(ByVal text As String)
        Label4.Text = text
    End Sub


    Private Sub ReceiveData()
        Dim message As String = "<mos><mosID>" + txtmosID.Text + "</mosID><ncsID>my-ncs-id</ncsID><messageID>100</messageID><heartbeat><time>2022-04-27T12:00:00</time></heartbeat></mos>"
        Dim data As Byte() = Encoding.GetBytes(message)
        stream.Write(data, 0, data.Length)

        While True
            If (stream.CanWrite) And mosClient.Connected Then
                'stream.Write(data, 0, data.Length)

                'Dim message1 As String = "<?xml version='1.0' encoding='UTF-16BE'?>" & vbCrLf &
                '        "<mos>" & vbCrLf &
                '        "    <mosID>" & cRequestMachineInfo.MOSID & "</mosID>" & vbCrLf &
                '        "    <ncsID>my-ncs-id</ncsID>" & vbCrLf &
                '        "    <messageID>" & cRequestMachineInfo.MESSAGEID & "</messageID>" & vbCrLf &
                '        "     <reqMachInfo/>" & vbCrLf &
                '        "</mos>"

                'Dim messageBytes As Byte() = Encoding.GetEncoding("UTF-16BE").GetBytes(message1)
                'stream.Write(messageBytes, 0, messageBytes.Length)


                Thread.Sleep(100) 'wait to get responce

                If stream.DataAvailable Then
                    Dim responseData As Byte() = New Byte(10024) {}
                    Dim response As String = ""
                    Dim bytes As Integer = stream.Read(responseData, 0, responseData.Length)

                    response = encoding.GetString(responseData, 0, bytes)
                    Dim updateLabelDelegate As UpdateLabelDelegate = New UpdateLabelDelegate(AddressOf UpdateLabel)

                    Label4.Invoke(updateLabelDelegate, "Received response: " + response)
                End If
                Thread.Sleep(5000)
            End If
        End While
    End Sub

    Private Sub Form1_Closing(sender As Object, e As CancelEventArgs) Handles Me.Closing
        On Error Resume Next
        receiveThread.Abort()
        stream.Close()
        mosClient.Close()

    End Sub

    Public Class cRequestMachineInfo
        Public Const MOSID As String = "mosID_RCC"
        Public Const MOSVERSION As String = "2.8"
        Public Const MESSAGEID As String = "REQUESTMACHINEINFO"
        Public Const PROTOCOLVERSION As String = "1.0"
        Public Const REVISION As String = "0"
    End Class


End Class


