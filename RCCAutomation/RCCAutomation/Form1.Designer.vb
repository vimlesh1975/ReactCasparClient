<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Form1
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.cmdSend = New System.Windows.Forms.Button()
        Me.txtName = New System.Windows.Forms.TextBox()
        Me.cmdUpdate = New System.Windows.Forms.Button()
        Me.cmdStop = New System.Windows.Forms.Button()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.txtKey = New System.Windows.Forms.TextBox()
        Me.txtLayerNumber = New System.Windows.Forms.TextBox()
        Me.txtPageName = New System.Windows.Forms.TextBox()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.SuspendLayout()
        '
        'cmdSend
        '
        Me.cmdSend.Location = New System.Drawing.Point(269, 13)
        Me.cmdSend.Name = "cmdSend"
        Me.cmdSend.Size = New System.Drawing.Size(75, 23)
        Me.cmdSend.TabIndex = 0
        Me.cmdSend.Text = "Show"
        Me.cmdSend.UseVisualStyleBackColor = True
        '
        'txtName
        '
        Me.txtName.Location = New System.Drawing.Point(92, 64)
        Me.txtName.Name = "txtName"
        Me.txtName.Size = New System.Drawing.Size(155, 20)
        Me.txtName.TabIndex = 1
        Me.txtName.Text = "Vimlesh Kumar"
        '
        'cmdUpdate
        '
        Me.cmdUpdate.Location = New System.Drawing.Point(269, 42)
        Me.cmdUpdate.Name = "cmdUpdate"
        Me.cmdUpdate.Size = New System.Drawing.Size(75, 23)
        Me.cmdUpdate.TabIndex = 2
        Me.cmdUpdate.Text = "Update"
        Me.cmdUpdate.UseVisualStyleBackColor = True
        '
        'cmdStop
        '
        Me.cmdStop.Location = New System.Drawing.Point(269, 71)
        Me.cmdStop.Name = "cmdStop"
        Me.cmdStop.Size = New System.Drawing.Size(75, 23)
        Me.cmdStop.TabIndex = 3
        Me.cmdStop.Text = "Stop"
        Me.cmdStop.UseVisualStyleBackColor = True
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Location = New System.Drawing.Point(13, 13)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(73, 13)
        Me.Label1.TabIndex = 4
        Me.Label1.Text = "Layer Number"
        '
        'txtKey
        '
        Me.txtKey.Location = New System.Drawing.Point(48, 64)
        Me.txtKey.Name = "txtKey"
        Me.txtKey.Size = New System.Drawing.Size(38, 20)
        Me.txtKey.TabIndex = 5
        Me.txtKey.Text = "f0"
        '
        'txtLayerNumber
        '
        Me.txtLayerNumber.Location = New System.Drawing.Point(92, 10)
        Me.txtLayerNumber.Name = "txtLayerNumber"
        Me.txtLayerNumber.Size = New System.Drawing.Size(38, 20)
        Me.txtLayerNumber.TabIndex = 6
        Me.txtLayerNumber.Text = "96"
        '
        'txtPageName
        '
        Me.txtPageName.Location = New System.Drawing.Point(92, 38)
        Me.txtPageName.Name = "txtPageName"
        Me.txtPageName.Size = New System.Drawing.Size(101, 20)
        Me.txtPageName.TabIndex = 8
        Me.txtPageName.Text = "Imageandname"
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Location = New System.Drawing.Point(13, 41)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(63, 13)
        Me.Label2.TabIndex = 7
        Me.Label2.Text = "Page Name"
        '
        'Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(360, 114)
        Me.Controls.Add(Me.txtPageName)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.txtLayerNumber)
        Me.Controls.Add(Me.txtKey)
        Me.Controls.Add(Me.Label1)
        Me.Controls.Add(Me.cmdStop)
        Me.Controls.Add(Me.cmdUpdate)
        Me.Controls.Add(Me.txtName)
        Me.Controls.Add(Me.cmdSend)
        Me.Name = "Form1"
        Me.Text = "Form1"
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents cmdSend As Button
    Friend WithEvents txtName As TextBox
    Friend WithEvents cmdUpdate As Button
    Friend WithEvents cmdStop As Button
    Friend WithEvents Label1 As Label
    Friend WithEvents txtKey As TextBox
    Friend WithEvents txtLayerNumber As TextBox
    Friend WithEvents txtPageName As TextBox
    Friend WithEvents Label2 As Label
End Class
