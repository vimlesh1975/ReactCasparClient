Imports System.Net
Imports Newtonsoft.Json

Public Class Form1
    Dim client As New WebClient()

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        PictureBox1.Load("https://picsum.photos/id/" & CInt(Math.Ceiling(Rnd() * 100)) + 1 & "/300/200")
        txtName.Text = PictureBox1.ImageLocation
    End Sub

    Private Sub cmdSend_Click(sender As Object, e As EventArgs) Handles cmdSend.Click

        Dim data1 = New rccData With {.key = txtKeyName.Text, .value = txtName.Text, .type = "text"}
        Dim data2 = New rccData With {.key = txtKeyImage.Text, .value = PictureBox1.ImageLocation, .type = "image"}
        Dim allData = {data1, data2}
        Dim postData As String = "layerNumber=" & txtLayerNumber.Text & "&pageName=" & txtPageName.Text & "&data=" & JsonConvert.SerializeObject(allData)
        Dim data As Byte() = System.Text.Encoding.ASCII.GetBytes(postData)
        Dim url As String = "http://localhost:8080/recallPage"
        client.Headers.Add("Content-Type", "application/x-www-form-urlencoded")
        client.UploadData(url, data)
    End Sub

    Private Sub cmdUpdate_Click(sender As Object, e As EventArgs) Handles cmdUpdate.Click
        Dim data1 = New rccData With {.key = txtKeyName.Text, .value = txtName.Text, .type = "text"}
        Dim data2 = New rccData With {.key = txtKeyImage.Text, .value = PictureBox1.ImageLocation, .type = "image"}

        Dim allData = {data1, data2}
        Dim postData As String = "layerNumber=" & txtLayerNumber.Text & "&data=" & JsonConvert.SerializeObject(allData)
        Dim data As Byte() = System.Text.Encoding.ASCII.GetBytes(postData)
        Dim url As String = "http://localhost:8080/updateData"
        client.Headers.Add("Content-Type", "application/x-www-form-urlencoded")
        client.UploadData(url, data)
    End Sub

    Private Sub cmdStop_Click(sender As Object, e As EventArgs) Handles cmdStop.Click
        Dim postData As String = "layerNumber=" & txtLayerNumber.Text
        Dim data As Byte() = System.Text.Encoding.ASCII.GetBytes(postData)
        Dim url As String = "http://localhost:8080/stopGraphics"
        client.Headers.Add("Content-Type", "application/x-www-form-urlencoded")
        client.UploadData(url, data)
    End Sub

    Private Sub cmdLoadnewPhoto_Click(sender As Object, e As EventArgs) Handles cmdLoadnewPhoto.Click
        PictureBox1.Load("https://picsum.photos/id/" & CInt(Math.Ceiling(Rnd() * 100)) + 1 & "/300/200")
        txtName.Text = PictureBox1.ImageLocation
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        PictureBox1.Load("http://localhost:8080/media/anchor.png")
        txtName.Text = PictureBox1.ImageLocation
    End Sub
End Class
Class rccData
    Public key As String
    Public value As String
    Public type As String
End Class