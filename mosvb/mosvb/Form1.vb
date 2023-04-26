Imports System.IO
Imports System.Net.Sockets
Imports System.Text
Imports System.Threading
Imports System.Xml
Imports System.Xml.Serialization
Imports mosvb.mosprotocol

Public Class Form1
    Dim mosClient As New TcpClient
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Dim allEncodings() As EncodingInfo = Encoding.GetEncodings()

        'Add encoding names to combo box
        For Each encoding As EncodingInfo In allEncodings
            ComboBox2.Items.Add(encoding.Name)
        Next
        connect()
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' On Error Resume Next
        Dim heartbeat As cHeartBeat = New cHeartBeat()
        heartbeat.time = DateTime.Now
        Dim mos As cMOS = New cMOS()
        mos.messageID = 333
        mos.mosID = "mosID_RCC"
        mos.ncsID = "NCS_RCC"
        mos.heartbeat = heartbeat
        mos.pageName = txtPageName.Text

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
            End If
        Catch ex As Exception

        End Try
    End Sub

End Class


