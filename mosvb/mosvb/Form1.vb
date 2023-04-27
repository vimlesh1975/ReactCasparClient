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
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Dim allEncodings() As EncodingInfo = Encoding.GetEncodings()

        'Add encoding names to combo box
        For Each encoding As EncodingInfo In allEncodings
            ComboBox2.Items.Add(encoding.Name)
        Next
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

        Dim encodingValue As String = ComboBox2.Text
        Dim encoding As Encoding = Encoding.GetEncoding(encodingValue)

        Dim settings As XmlWriterSettings = New XmlWriterSettings()
        settings.Encoding = encoding
        Dim xml As XmlSerializer = New XmlSerializer(GetType(cMOS))
        Dim ms As MemoryStream = New MemoryStream()
        Dim writer As XmlWriter = XmlWriter.Create(ms, settings)
        xml.Serialize(writer, mos)
        Try
            If mosClient.Connected Then
                mosClient.GetStream().Write(ms.GetBuffer(), 0, CInt(ms.Length))


                'Thread.Sleep(2000)
                'Dim returndata As String = ""
                'Dim data(1024) As Byte
                'Try
                '    mosClient.GetStream().Read(data, 0, 1024)
                '    returndata = encoding.GetString(data)
                '    Label4.Text = returndata
                'Catch ex As Exception
                '    Console.WriteLine(ex.ToString)
                'End Try


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
                mosClient.Dispose()
                cmdConnect.BackColor = Color.Red
                mosClient = New TcpClient

            Else
                mosClient = New TcpClient(cmbHost.Text, ComboBox1.Text)

                cmdConnect.BackColor = Color.Green

                stream = mosClient.GetStream()
                Dim message As String = "<mos><mosID>" + txtmosID.Text + "</mosID><ncsID>my-ncs-id</ncsID><heartbeat><time>2022-04-27T12:00:00</time></heartbeat></mos>"

                Dim encodingValue As String = ComboBox2.Text
                Dim encoding As Encoding = Encoding.GetEncoding(encodingValue)

                Dim data As Byte() = encoding.GetBytes(message)
                stream.Write(data, 0, data.Length)

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

        While True

            Dim message As String = "<mos><mosID>mosID_RCC</mosID><ncsID>ncs vbdotnet</ncsID><heartbeat><time>2022-04-27T12:00:00</time></heartbeat></mos>"

            Dim encodingValue As String = "utf-16BE"
            Dim encoding As Encoding = Encoding.GetEncoding(encodingValue)

            Dim data As Byte() = encoding.GetBytes(message)
            stream.Write(data, 0, data.Length)

            If Stream.DataAvailable Then
                ' Receive a response from the device
                Dim responseData As Byte() = New Byte(1024) {}
                Dim response As String = ""
                Dim bytes As Integer = stream.Read(responseData, 0, responseData.Length)


                response = Encoding.GetString(responseData, 0, bytes)

                ' Process the response
                'Label4.Text = ("Received response: " + response)
                ' Inside your code that receives the response:
                ' Create an instance of the delegate with the method that updates the label
                Dim updateLabelDelegate As UpdateLabelDelegate = New UpdateLabelDelegate(AddressOf UpdateLabel)

                ' Invoke the delegate on the UI thread to update the label
                Label4.Invoke(updateLabelDelegate, "Received response: " + response)
            End If
            'Wait for some time before checking for incoming data again'
            Thread.Sleep(5000)
        End While
    End Sub

End Class


